// 1658. Minimum Operations to Reduce X to Zero
// https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/
// You are given an integer array nums and an integer x.
// In one operation, you can either remove the leftmost or the rightmost element
// from the array nums and subtract its value from x.
// Note that this modifies the array for future operations.

// Return the minimum number of operations to reduce x to exactly 0
// if it is possible, otherwise, return -1.

// Example 1:
// Input: nums = [1,1,4,2,3], x = 5
// Output: 2
// Explanation: The optimal solution is to remove the last two elements to reduce x to zero.

/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
const minOperations = function (nums, x) {
  const n = nums.length
  const target = nums.reduce((acc, val) => acc + val, 0) - x // Calculate the target sum we need to find
  let max = -1 // Initialize the maximum length of subarray with sum equal to target
  let start = 0 // Initialize the start pointer
  let end = 0 // Initialize the end pointer
  let sum = 0 // Initialize the current sum of the window

  // Iterate through the array with the end pointer
  while (end < n) {
    sum += nums[end] // Add the current element to the sum

    // Shrink the window from the left if the sum exceeds the target
    while (sum > target) {
      sum -= nums[start] // Subtract the element at the start pointer from the sum
      start++ // Move the start pointer to the right
    }

    // Check if the current window sum is equal to the target
    if (sum === target) {
      max = Math.max(max, end - start + 1) // Update the maximum length of the subarray
    }

    end++ // Move the end pointer to the right
  }

  // If max is -1, it means no valid subarray was found, return -1
  // Otherwise, return the minimum number of operations, which is the total length minus the length of the subarray
  return max === -1 ? -1 : n - max
}

// Example usage:
console.log(minOperations([1, 1, 4, 2, 3], 5)) // Expected output: 2
console.log(minOperations([5, 6, 7, 8, 9], 4)) // Expected output: -1
console.log(minOperations([3, 2, 20, 1, 1, 3], 10)) // Expected output: 5

// Target Sum:
// Calculate the target sum we need to find in the array,
// which is the total sum of the array minus x.
// This target sum represents the sum of the elements
// that should remain in the array after removing
// elements from both ends.

// Finding the Longest Subarray:
// Use a sliding window approach to find the longest subarray
// whose sum is equal to the target.
// The length of this subarray represents the maximum number
// of elements that can remain in the array while achieving the target sum.

// Minimum Number of Operations:
// The minimum number of operations required to reduce x to zero
// is the total number of elements in the array minus the length
// of the longest subarray with the target sum.
// This is because the elements that are not part
// of this subarray need to be removed from either end of the array.
