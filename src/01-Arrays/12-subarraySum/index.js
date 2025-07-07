// 560. Subarray Sum Equals K
// https://leetcode.com/problems/subarray-sum-equals-k/
// https://www.youtube.com/watch?v=6poxiip7sBY
// Given an array of integers nums and an integer k,
// return the total number of subarrays whose sum equals to k.
// A subarray is a contiguous non-empty sequence of elements within an array.
// Example 1:

// Input: nums = [1,1,1], k = 2
// Output: 2
// Example 2:

// Input: nums = [1,2,3], k = 3
// Output: 2

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraySum = function (nums, k) {
  const map = new Map() // Map to store the cumulative sum frequencies
  map.set(0, 1) // Initialize the map with sum 0 having frequency 1
  let count = 0 // Initialize the count of subarrays
  let sum = 0 // Initialize the cumulative sum

  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] // Update the cumulative sum
    // Check if there is a subarray with sum equal to k
    if (map.has(sum - k)) {
      count += map.get(sum - k) // Increment the count by the frequency of (sum - k)
    }
    // Update the map with the current cumulative sum
    map.set(sum, (map.get(sum) || 0) + 1)
  }

  return count // Return the count of subarrays with sum equal to k
}
