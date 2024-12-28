// 1004. Max Consecutive Ones III
// https://leetcode.com/problems/max-consecutive-ones/
// https://leetcode.com/problems/max-consecutive-ones-iii/description/
// https://www.youtube.com/watch?v=4velNAJGnnM
// Given a binary array nums and an integer k,
// return the maximum number of consecutive 1's in the array
// if you can flip at most k 0's.

// Example 1:

// Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
// Output: 6
// Explanation: [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1.
// The longest subarray is underlined.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const longestOnes = function (nums, k) {
  let left = 0 // Initialize the left pointer of the sliding window
  let right = 0 // Initialize the right pointer of the sliding window
  let max = 0 // Variable to store the maximum number of consecutive 1's
  let zeroCount = 0 // Counter for the number of 0's in the current window

  // Iterate through the array using the right pointer
  while (right < nums.length) {
    if (nums[right] === 0) {
      zeroCount++ // Increment zeroCount if the current element is 0
    }

    // If the number of 0's exceeds k, shrink the window from the left
    while (zeroCount > k) {
      if (nums[left] === 0) {
        zeroCount-- // Decrement zeroCount if the element being removed is 0
      }
      left++ // Move the left pointer to the right
    }

    // Update the maximum length if the current window is larger
    max = Math.max(max, right - left + 1)
    right++ // Expand the window by moving the right pointer to the right
  }

  return max // Return the maximum number of consecutive 1's found
}

// Example usage:
console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)) // Expected output: 6
console.log(longestOnes([0, 0, 1, 1, 1, 0, 0], 0)) // Expected output: 3
console.log(longestOnes([1, 1, 1, 1], 0)) // Expected output: 4
