// https://leetcode.com/problems/contiguous-array/description/
// https://www.youtube.com/watch?v=nSEO5zOwP7g&t=62s
// Given a binary array nums, return the maximum length of a contiguous subarray
// with an equal number of 0 and 1.

// Example 1:

// Input: nums = [0,1]
// Output: 2
// Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaxLength = function (nums) {
  // Initialize a map to store the count and its corresponding index
  const map = new Map()
  // Add a base case to handle the situation when the subarray starts from index 0
  map.set(0, -1)
  let max = 0 // Variable to store the maximum length of the subarray
  let count = 0 // Variable to store the count of 1s and 0s

  for (let i = 0; i < nums.length; i++) {
    // Increment count by 1 if nums[i] is 1, otherwise decrement by 1
    count += nums[i] === 0 ? -1 : 1

    // If the count has been seen before,
    // it means there is a subarray with equal number of 0s and 1s
    if (map.has(count)) {
      // Update the maximum length of the subarray
      max = Math.max(max, i - map.get(count))
    } else {
      // Otherwise, store the count with its corresponding index
      map.set(count, i)
    }
  }

  return max // Return the maximum length of the subarray
}

// We start traversing the array from left to right.
// If at any moment, the count becomes zero,
// it implies that we've encountered equal number of zeros and ones 
// from the beginning till the current index of the array.
// Not only this, another point to be noted is that
// if we find the same count twice,
// it means that the number of zeros and ones are equal
// between the indices corresponding to the equal count values.

// It uses a map to track the count of 1s and 0s and their
// corresponding indices to identify subarrays
// with equal numbers of 0s and 1s.

// The expression i - map.get(count) calculates the length of the subarray
// with an equal number of 0s and 1s.
// Here, i is the current index in the array,
// and map.get(count) retrieves the index
// where the same cumulative count was first encountered.
// The difference between these two indices gives the length
// of the subarray that has an equal number of 0s and 1s.
