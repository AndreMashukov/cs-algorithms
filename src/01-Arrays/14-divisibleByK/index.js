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
  const map = new Map()
  let sum = 0
  let count = 0
  map.set(0, 1)
  for (const num of nums) {
    sum = (sum + num) % k
    if (sum < 0) sum += k
    if (map.has(sum)) {
      count += map.get(sum)
    }
    map.set(sum, (map.get(sum) || 0) + 1)
  }
  return count
}
