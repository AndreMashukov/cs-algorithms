// 1493. Longest Subarray of 1's After Deleting One Element
// https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/

// Given a binary array nums, you should delete one element from it.
// Return the size of the longest non-empty subarray containing
// only 1's in the resulting array. Return 0 if there is no such subarray.

/**
 * @param {number[]} nums
 * @return {number}
 */
const longestSubarray = function (nums) {
  let l = 0 // Initialize the left pointer of the sliding window
  let r = 0 // Initialize the right pointer of the sliding window
  let max = 0 // Variable to store the maximum number of consecutive 1's
  let zeroCount = 0 // Counter for the number of 0's in the current window

  // Iterate through the array using the right pointer
  while (r < nums.length) {
    if (nums[r] === 0) {
      zeroCount++ // Increment zeroCount if the current element is 0
    }

    // If the number of 0's exceeds 1, shrink the window from the left
    while (zeroCount > 1) {
      if (nums[l] === 0) {
        zeroCount-- // Decrement zeroCount if the element being removed is 0
      }
      l++ // Move the left pointer to the right
    }

    // Update the maximum length if the current window is larger
    max = Math.max(max, r - l)
    r++ // Expand the window by moving the right pointer to the right
  }

  return max // Return the maximum number of consecutive 1's found
}

console.log(longestSubarray([1, 1, 0, 1])) // Expected output: 3
console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])) // Expected output: 5
