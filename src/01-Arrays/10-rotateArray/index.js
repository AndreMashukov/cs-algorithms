// https://leetcode.com/problems/rotate-array/description/
// http://youtube.com/watch?v=utE_1ppU5DY
// Given an integer array nums, rotate the array to the right by k steps, 
// where k is non-negative.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function(nums, k) {
  // If k is greater than nums length, take the remainder
  k = k % nums.length;
  // Reverse the whole array
  reverse(nums, 0, nums.length - 1);
  // Reverse the first k elements
  reverse(nums, 0, k - 1);
  // Reverse the rest of the elements
  reverse(nums, k, nums.length - 1);
};

/**
 * Reverses elements in the array from start to end indices.
 * @param {number[]} nums - The array to reverse.
 * @param {number} start - The starting index.
 * @param {number} end - The ending index.
 */
const reverse = function(nums, start, end) {
  while (start < end) {
    // Swap the elements at start and end
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
};
