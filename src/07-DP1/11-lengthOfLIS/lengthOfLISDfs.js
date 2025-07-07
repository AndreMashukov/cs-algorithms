class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  lengthOfLIS (nums) {
    const map = new Map()

    const dfs = (i) => {
      if (map.has(i)) return map.get(i)

      // Find longest sequence starting at index i
      let max = 1
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] > nums[i]) {
          // adds 1 to the length of the LIS starting from i,
          // because the current element at index
          // can be appended to this subsequence
          // to form a longer increasing subsequence.
          max = Math.max(max, 1 + dfs(j))
        }
      }

      map.set(i, max)
      return max
    }

    // Try each index as start of sequence
    let maxLen = 0
    for (let i = 0; i < nums.length; i++) {
      maxLen = Math.max(maxLen, dfs(i))
    }

    return maxLen
  }
}

console.log(new Solution().lengthOfLIS([9, 1, 4, 2, 3, 3, 7])) // 4
