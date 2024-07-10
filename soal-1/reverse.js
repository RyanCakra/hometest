// SOAL 1: REVERSE INTEGER
/* 
Given a signed 32-bit integer x, return x with its digits reversed.

Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21
**/

let reverse = function (x) {
  // fungsi ini untuk menentukan apakah angka x bernilai negatif
  let negative = false;
  if (x < 0) {
    negative = true;
    x = -x;
  }

  // fungsi ini untuk melooping, serta mendapatkan nilai terakhir
  // dan membalikkan nilai

  let reversed = 0;
  while (x > 0) {
    reversed = reversed * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  // fungsi ini untuk mengecek apakah variable tersebut adalah
  // bilangan yang melebihi angka 32 bit
  if (reversed > 2 ** 31 - 1) {
    return 0;
  }

  // fungsi ini untuk mengembalikan nilai tersebut
  // jika negative true maka mengembalikan -reversed
  // jika negative false mengembalikan reversed
  return negative ? -reversed : reversed;
};

// example 1: 321
console.log('example 1 reverse', reverse(123));

// example 2: -321
console.log('example 2 reverse', reverse(-123));

// example 3: 21
console.log('example 3 reverse', reverse(120));
