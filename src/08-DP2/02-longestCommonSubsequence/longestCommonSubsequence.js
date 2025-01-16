// Given two strings text1 and text2, return the length of the longest common subsequence
// between the two strings if one exists, otherwise return 0.
// A subsequence is a sequence that can be derived
// from the given sequence by deleting some or no elements
// without changing the relative order of the remaining characters.
// For example, "cat" is a subsequence of "crabt".

class Solution {
  /**
   * @param {string} text1
   * @param {string} text2
   * @return {number}
   */
  longestCommonSubsequence (text1, text2) {
    const dp = Array(text1.length + 1)
      .fill()
      .map(() => Array(text2.length + 1).fill(0))

    console.log(dp)

    for (let i = text1.length - 1; i >= 0; i--) {
      for (let j = text2.length - 1; j >= 0; j--) {
        if (text1[i] === text2[j]) {
          dp[i][j] = 1 + dp[i + 1][j + 1]
        } else {
          dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j])
        }
      }
    }

    return dp[0][0]
  }
}

console.log(new Solution().longestCommonSubsequence('abcde', 'ace')) // 3
