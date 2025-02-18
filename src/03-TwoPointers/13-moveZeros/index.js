// 283. Move Zeroes
// https://leetcode.com/problems/move-zeroes/description/
// Easy
// Topics
// Companies
// Hint
// Given an integer array nums, move all 0's to the end of it while maintaining
// the relative order of the non-zero elements.
// Note that you must do this in-place without making a copy of the array.
// Example 1:

// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

const moveZeroes = function (nums) {
  let l = 0
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== 0) {
      [nums[r], nums[l]] = [nums[l], nums[r]]
      l++
    }
  }
}
