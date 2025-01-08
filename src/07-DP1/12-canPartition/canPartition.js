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
        // t + nums[i] is the sum of the subset that includes nums[i]
        if (t + nums[i] === target) {
          return true
        }
        // nums[i] is included in the subset.
        // add nums[i] to each sum in the current dp set
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

// [1, 2, 3, 4]:

// i = 3 (nums[3] = 4):
// nextDP = {0, 4}
// (0 is from the initial dp set,
// and 4 is from adding nums[3]
// to each element in the dp set)

// i = 2 (nums[2] = 3):
// nextDP = {0, 3, 4, 7}
// (0, 4 are from the previous dp set, and 3, 7 are from
// adding nums[2] to each element in the previous dp set)

// i = 1 (nums[1] = 2):
// nextDP = {0, 2, 3, 4, 5, 6, 7, 9} (0, 3, 4, 7
// are from the previous dp set, and 2, 5, 6, 9 are from adding nums[1]
// to each element in the previous dp set)

// i = 0 (nums[0] = 1):
// nextDP = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
//  (0, 2, 3, 4, 5, 6, 7, 9 are from the previous dp set,
//  and 1, 3, 4, 5, 6, 7, 8, 10 are from adding nums[0]
// to each element in the previous dp set)

// At the end of the last iteration, nextDP includes
// the target sum (10 / 2 = 5), so the function returns true,
