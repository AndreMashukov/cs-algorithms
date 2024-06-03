class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  lengthOfLIS (nums) {
    // Initialize cache
    const cache = new Array(nums.length).fill(-1)

    let maxLen = 0
    for (let i = 0; i < nums.length; i++) {
      maxLen = Math.max(maxLen, this.dfs(nums, i, cache))
    }

    return maxLen
  }

  dfs (nums, index, cache) {
    // If this subproblem has been solved before, return the cached result
    if (cache[index] !== -1) {
      return cache[index]
    }

    let maxLen = 1
    for (let i = index + 1; i < nums.length; i++) {
      if (nums[i] > nums[index]) {
        // adds 1 to the length of the LIS starting from i,
        // because the current element at index
        // can be appended to this subsequence
        // to form a longer increasing subsequence.
        maxLen = Math.max(maxLen, 1 + this.dfs(nums, i, cache))
      }
    }

    // Cache the result of this subproblem
    cache[index] = maxLen

    return maxLen
  }
}

console.log(new Solution().lengthOfLIS([9, 1, 4, 2, 3, 3, 7])) // 4
