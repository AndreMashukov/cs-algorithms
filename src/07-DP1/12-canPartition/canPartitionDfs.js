class Solution {
  /**
   * Determines if array can be partitioned into two equal sum subsets
   * @param {number[]} nums Input array of positive integers
   * @return {boolean} True if equal partition possible, false otherwise
   */
  canPartition (nums) {
    // Calculate total sum to determine target for each subset
    const sum = nums.reduce((acc, num) => acc + num, 0)
    if (sum % 2 !== 0) {
      return false // Odd sum cannot be partitioned equally
    }

    // Memoization cache to store results of subproblems
    // Key: [index][target] -> Value: boolean result
    const map = new Map()

    /**
     * DFS helper to find valid partition
     * @param {number} i Current index in nums array
     * @param {number} target Remaining sum needed for current partition
     * @returns {boolean} True if valid partition found from this state
     */
    const dfs = (i, target) => {
      // Base cases
      if (i === nums.length) {
        return target === 0 // Valid partition found if target reached exactly
      }
      if (target < 0) {
        return false // Invalid path if target goes negative
      }

      // Check memoized result
      const key = `${i},${target}`
      if (map.has(key)) {
        return map.get(key)
      }

      // Try both options:
      // 1. Skip current number
      // 2. Include current number in partition
      const result = dfs(i + 1, target) || dfs(i + 1, target - nums[i])
      map.set(key, result)
      return result
    }

    return dfs(0, sum / 2)
  }
}
