// You are given two strings s and t, both consisting of english letters.
// Return the number of distinct subsequences of s which are equal to t.
// Example 1:
// Input: s = "caaat", t = "cat"
// Output: 3

class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {number}
   */
  numDistinct (s, t) {
    const dp = new Map()

    const dfs = (i, j) => {
      if (i === s.length && j === t.length) {
        return 1
      }

      if (i > s.length || j > t.length) {
        return 0
      }

      const key = `${i} - ${j}`

      if (dp.has(key)) {
        dp.get(key)
      }

      let result
      if (s[i] === t[j]) {
        result = dfs(i + 1, j + 1) + dfs(i + 1, j)
      } else {
        result = dfs(i + 1, j)
      }

      dp.set(key, result)
      return result
    };

    return dfs(0, 0)
  }
}

console.log(new Solution().numDistinct('rabbbit', 'rabbit')) // 3
