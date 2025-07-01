// 974. Subarray Sums Divisible by K
// https://leetcode.com/problems/subarray-sums-divisible-by-k/description/
// https://www.youtube.com/watch?v=bcXy-T4Sc3E
// Given an integer array nums and an integer k,
//  return the number of non-empty subarrays
// that have a sum divisible by k.

// A subarray is a contiguous part of an array.

// Example 1:

// Input: nums = [4,5,0,-2,-3,1], k = 5
// Output: 7
// Explanation: There are 7 subarrays with a sum divisible by k = 5:
// [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraysDivByK = function (nums, k) {
  // Create a map to store the frequency of remainders
  const map = new Map()
  // Initialize the sum and count variables
  let sum = 0
  let count = 0
  // Add the initial remainder of 0 to the map with a frequency of 1
  map.set(0, 1)
  // Iterate over the numbers in the input array
  for (const num of nums) {
    // Update the sum by adding the current number and taking the modulo with k
    sum = (sum + num) % k
    // If the sum is negative, add k to make it positive
    if (sum < 0) sum += k
    // If the map contains the current sum, increment the count by the frequency of that sum
    if (map.has(sum)) {
      count += map.get(sum)
    }
    // Update the frequency of the current sum in the map
    map.set(sum, (map.get(sum) || 0) + 1)
  }
  // Return the total count of subarrays divisible by k
  return count
}

// if the sum is negative, add k to make it positive
// The purpose of this step is to ensure that
// the remainder is always a non-negative value
// between 0 and k-1, which is necessary
// for correctly using the remainder as a key in the map.
