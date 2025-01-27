import React, { useState, useRef, useEffect } from 'react';
import './index.css';

const App = () => {
  // deklarasi state yang digunakan
  const [canvasSize, setCanvasSize] = useState({ width: 640, height: 360 });
  const [image, setImage] = useState(null);
  const [imagePosition, setimagePosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  // fungsi ini akan dijalankan ketika terjadi perubahan pada canvasSize, image, dan imagePosition.
  // yang berfungsi untuk mereload ulang canvas dan gambar baru sesuai dengan yang ditentukan
  useEffect(() => {
    if (image && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        ctx.drawImage(image, imagePosition.x, imagePosition.y, imagePosition.width, imagePosition.height);
      } else {
        console.error('Failed to get canvas context.');
      }
    }
  }, [canvasSize, image, imagePosition]);

  // fungsi ini digunakan untuk menghandle perubahan pada file gambar yang diupload
  // serta mengatur properti image dan imagePosition agar tetap sesuai dengan canvas
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(canvasSize.width / img.width, canvasSize.height / img.height);
        const width = img.width * scale;
        const height = img.height * scale;
        setimagePosition({ x: 0, y: 0, width, height });
        setImage(img);
        setError('');
      };
      img.src = URL.createObjectURL(file);
    } else {
      setError('File yang diupload harus berupa gambar.');
    }
  };

  // fungsi ini digunakan untuk menghandle perubahan pada ukuran canvas
  // serta memastikan ukuran minimal adalah 100x100,
  // dan akan memunculkan pesan kesalahan jika kurang dari itu
  const handleCanvasSizeChange = () => {
    const width = parseInt(document.getElementById('canvasWidth').value);
    const height = parseInt(document.getElementById('canvasHeight').value);
    if (width >= 100 && height >= 100) {
      setCanvasSize({ width, height });
      setError('');
    } else {
      setError('Ukuran minimal canvas adalah 100x100.');
    }
  };

  // ini berfungsi untuk mengubah posisi gambar sesuai dengan input user
  const handleimagePositionChange = () => {
    const x = parseInt(document.getElementById('imageX').value);
    const y = parseInt(document.getElementById('imageY').value);
    const width = Math.round(parseFloat(document.getElementById('imageWidth').value));
    const height = Math.round(parseFloat(document.getElementById('imageHeight').value));
    setimagePosition({ x, y, width, height });
  };

  return (
    <div className="flex justify-center items-center p-8 bg-gray-100 min-h-screen">
      {/* Canvas Properties */}
      <div className="flex items-center p-8 gap-7">
        <div className="flex w-full mb-8 h-max">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Canvas Properties</h1>
            <div className="flex flex-col mb-4">
              <label className="mb-2">
                Width:
                <input id="canvasWidth" type="number" defaultValue={canvasSize.width} className="border ml-2 p-1 w-full" />
              </label>
              <label className="mb-2">
                Height:
                <input id="canvasHeight" type="number" defaultValue={canvasSize.height} className="border ml-2 p-1 w-full" />
              </label>
            </div>
            <button onClick={handleCanvasSizeChange} disabled={!!image} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 w-full">
              Change Size
            </button>
          </div>
        </div>

        {/* Canvas and upload image */}
        <div className="flex flex-col justify-center gap-4 p-8 mb-8">
          {error && <div className="bg-red-100 shadow-md rounded-lg p-4 text-red-500">{error}</div>}
          <div className="rounded-lg p-4 bg-white shadow-md">
            <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} style={{ border: '1.5px solid black' }} />
          </div>
          <div className=" bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
            <input type="file" onChange={handleImageUpload} className="mb-4 w-full" />
          </div>
        </div>
      </div>

      {/* Image Properties */}
      {image && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Image Properties</h2>
          <div className="flex flex-col mb-4">
            <label className="mb-2">
              X:
              <input id="imageX" type="number" defaultValue={imagePosition.x} className="border ml-2 p-1 w-full" />
            </label>
            <label className="mb-2">
              Y:
              <input id="imageY" type="number" defaultValue={imagePosition.y} className="border ml-2 p-1 w-full" />
            </label>
            <label className="mb-2">
              Width:
              <input id="imageWidth" type="number" defaultValue={imagePosition.width} className="border ml-2 p-1 w-full" />
            </label>
            <label className="mb-2">
              Height:
              <input id="imageHeight" type="number" defaultValue={imagePosition.height} className="border ml-2 p-1 w-full" />
            </label>
          </div>
          <button onClick={handleimagePositionChange} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Change Size
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
