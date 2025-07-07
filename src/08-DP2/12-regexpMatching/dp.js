class Solution {
  /**
   * @param {string} s - Input string
   * @param {string} p - Pattern string
   * @return {boolean} - True if the pattern matches the string, otherwise false
   */
  isMatch (s, p) {
    // Initialize DP table with false values
    const dp = new Array(s.length + 1)
      .fill(false)
      .map(() => new Array(p.length + 1).fill(false))
    // Base case: empty pattern matches empty string
    dp[s.length][p.length] = true

    // Fill the DP table from bottom to top
    for (let i = s.length; i >= 0; i--) {
      for (let j = p.length - 1; j >= 0; j--) {
        // Check if the current characters match
        const match = i < s.length && (s[i] === p[j] || p[j] === '.')

        // If the next character in the pattern is '*'
        if (j + 1 < p.length && p[j + 1] === '*') {
          // Two possibilities:
          // 1. Skip the '*' and the preceding element
          dp[i][j] = dp[i][j + 2]
          // 2. Use the '*' to match the current character in the string
          if (match) {
            dp[i][j] = dp[i + 1][j] || dp[i][j]
          }
        } else if (match) {
          // If the current characters match, move to the next characters in both the string and the pattern
          dp[i][j] = dp[i + 1][j + 1]
        }
      }
    }

    // The result is stored in dp[0][0], which represents matching the entire string with the entire pattern
    return dp[0][0]
  }
}
