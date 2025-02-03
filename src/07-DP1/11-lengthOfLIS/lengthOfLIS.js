// Given an integer array nums, return the length
// of the longest strictly increasing subsequence.

// A subsequence is a sequence that can be derived from the given sequence
// by deleting some or no elements without changing
// the relative order of the remaining characters.

// For example, "cat" is a subsequence of "crabt".
// Example 1:

// Input: nums = [9,1,4,2,3,3,7]

// Output: 4

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  lengthOfLIS (nums) {
    const dp = new Array(nums.length).fill(1)

    for (let i = nums.length - 1; i >= 0; i--) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] < nums[j]) {
          dp[i] = Math.max(dp[i], 1 + dp[j])
          // console.log(LIS)
        }
      }
    }
    return Math.max(...dp)
  }
}

console.log(new Solution().lengthOfLIS([9, 1, 4, 2, 3, 3, 7])) // 4

// [1, 1, 1, 1, 1, 2, 1]
// [ 1, 4, 2, 3, 2, 2, 1]
