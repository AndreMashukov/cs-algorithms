/**
 * Edit Distance Problem Solution using Dynamic Programming (Top-Down Approach)
 * Calculates minimum number of operations to convert word1 to word2
 * Operations allowed: insert, delete, replace
 */
class Solution {
  /**
   * @param {string} word1 - First input string
   * @param {string} word2 - Second input string
   * @return {number} - Minimum number of operations needed
   */
  minDistance (word1, word2) {
    const m = word1.length
    const n = word2.length
    // Create memoization array filled with -1
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1))

    const dfs = (i, j) => {
      // Base cases: if either string is exhausted,
      // return remaining length of other string
      if (i === m) return n - j // Insert remaining chars from word2
      if (j === n) return m - i // Delete remaining chars from word1
      // Return cached result if available
      if (dp[i][j] !== -1) return dp[i][j]

      // If characters match, no operation needed
      if (word1[i] === word2[j]) {
        dp[i][j] = dfs(i + 1, j + 1)
      } else {
        // Try all operations and take minimum:
        // 1. Delete char from word1 (i+1, j)
        // 2. Insert char into word1 (i, j+1)
        // 3. Replace char in word1 (i+1, j+1)
        let res = Math.min(dfs(i + 1, j), dfs(i, j + 1))
        res = Math.min(res, dfs(i + 1, j + 1))
        dp[i][j] = res + 1 // Add 1 for the operation performed
      }
      return dp[i][j]
    }

    return dfs(0, 0)
  }
}
