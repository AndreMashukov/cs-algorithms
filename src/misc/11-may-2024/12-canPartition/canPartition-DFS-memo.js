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

    const target = sum / 2
    // include larger numbers in the subset first
    nums.sort((a, b) => b - a)

    // Initialize memoization table
    this.memo = Array(nums.length)
      .fill()
      .map(() => Array(target + 1).fill(undefined))

    return this.dfs(nums, target, 0)
  }

  // keep track of the remaining sum needed to reach half of the total sum.
  dfs (nums, target, index) {
    if (target === 0) {
      return true
    }

    if (target < 0 || index === nums.length) {
      return false
    }

    // Check memoization table
    if (this.memo[index][target] !== undefined) {
      return this.memo[index][target]
    }

    // include the current number (nums[index]) in the first subset.
    if (this.dfs(nums, target - nums[index], index + 1)) {
      this.memo[index][target] = true
      return true
    }

    let nextIndex = index + 1
    while (nextIndex < nums.length && nums[nextIndex] === nums[index]) {
      nextIndex++
    }

    // not include the current number in the first subset,
    // which means it goes into the second subset
    this.memo[index][target] = this.dfs(nums, target, nextIndex)
    return this.memo[index][target]
  }
}

console.log(new Solution().canPartition([1, 2, 3, 4])) // true

// In this code, this.memo is a 2D array where
// this.memo[i][j] represents whether we can reach the sum j with the first i numbers. Before we calculate the result of a subproblem, we check if it's already in the memoization table. If it is, we return the stored result. If it's not, we calculate the result and store it in the memoization table.
// This way, we avoid repeating calculations for the same subproblems.
