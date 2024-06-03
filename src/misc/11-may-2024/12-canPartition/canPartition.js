// You are given an array of positive integers nums.

// Return true if you can partition the array into two subsets,
// subset1 and subset2 where sum(subset1) == sum(subset2).
// Otherwise, return false.

// Example 1:
// Input: nums = [1,2,3,4]
// Output: true
// Explanation: The array can be partitioned as [1, 4] and [2, 3].

class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  canPartition (nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0)
    if (sum % 2 !== 0) {
      return false
    }

    // all possible sums that can be made with the numbers processed so far
    let dp = new Set()
    // represents the sum of an empty subset.
    dp.add(0)
    const target = sum / 2

    for (let i = nums.length - 1; i >= 0; i--) {
      // all possible sums that can be made with the numbers
      // processed so far in the current iteration
      const nextDP = new Set()
      for (const t of dp) {
        if (t + nums[i] === target) {
          return true
        }
        // nums[i] is included in the subset.
        nextDP.add(t + nums[i])
        // the case where nums[i] is not included in the subset
        nextDP.add(t)
      }

      // After considering all sums in the current dp set,
      // nextDP becomes the new dp set for the next iteration.
      dp = nextDP
    }
    return false
  }
}

console.log(new Solution().canPartition([1, 2, 3, 4])) // true
