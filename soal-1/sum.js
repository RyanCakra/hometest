// SOAL 2: FIND TWO SUM
/* 
    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    You can return the answer in any order.

    Example 1:
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

    Example 2:
    Input: nums = [3,2,4], target = 6
    Output: [1,2]

    Example 3:
    Input: nums = [3,3], target = 6
    Output: [0,1]
**/

let twoSum = function (nums, target) {
  // fungsi ini untuk melooping, serta mendapatkan angka pertama.
  for (let i = 0; i < nums.length; i++)
    // fungsi ini untuk melooping, serta mendapatkan angka kedua.
    for (let j = 1; j < nums.length; j++)
      // fungsi ini untuk mengecek apakah angka tersebut sama dengan target.
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
};

// testing example 1
console.log('example 1 sum', twoSum([2, 7, 11, 15], 9));

// testing example 2
console.log('example 2 sum', twoSum([3, 2, 4], 6));

// testing example 3
console.log('example 3 sum', twoSum([3, 3], 6));
