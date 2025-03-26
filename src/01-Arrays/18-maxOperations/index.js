// 1679. Max Number of K-Sum Pairs
// https://leetcode.com/problems/max-number-of-k-sum-pairs/description
// https://www.youtube.com/watch?v=SP-YdgObPAQ
// You are given an integer array nums and an integer k.
// In one operation, you can pick two numbers from the array
// whose sum equals k and remove them from the array.
// Return the maximum number of operations you can perform on the array.

// Example 1:

// Input: nums = [1,2,3,4], k = 5
// Output: 2
// Explanation: Starting with nums = [1,2,3,4]:
// - Remove numbers 1 and 4, then nums = [2,3]
// - Remove numbers 2 and 3, then nums = []
// There are no more pairs that sum up to 5, hence a total of 2 operations.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxOperations = function (nums, k) {
  // Counter for valid pairs we've found
  let count = 0
  // Map to store frequencies of numbers we've seen
  const map = new Map()

  for (const num of nums) {
    // Calculate the complement needed to reach sum k
    const diff = k - num

    // If the complement exists in our map with available count
    if (map.has(diff) && map.get(diff) > 0) {
      // We found a valid pair, increment our operation count
      count++
      // Decrease the frequency of the complement as we've used it
      map.set(diff, map.get(diff) - 1)
    } else {
      // No valid pair found, add current number to map or increase its frequency
      map.set(num, (map.get(num) || 0) + 1)
    }
  }

  // Return the total number of valid pairs found
  return count
}
