// You are given two strings word1 and word2, each consisting of lowercase English letters.

// You are allowed to perform three operations on word1 an unlimited number of times:
// Insert a character at any position
// Delete a character at any position
// Replace a character at any position
// Return the minimum number of operations to make word1 equal word2.

class Solution {
  /**
   * @param {string} word1
   * @param {string} word2
   * @return {number}
   */
  minDistance (word1, word2) {
    // Initialize a 2D array (dp) with dimensions (word1.length + 1) x (word2.length + 1)
    const dp = new Array(word1.length + 1)
      .fill(0)
      .map(() => new Array(word2.length + 1).fill(0))

    // Fill the last row with the number of deletions needed to convert word1 to an empty string
    for (let j = 0; j <= word2.length; j++) {
      dp[word1.length][j] = word2.length - j
    }

    // Fill the last column with the number of deletions needed to convert word2 to an empty string
    for (let i = 0; i <= word1.length; i++) {
      dp[i][word2.length] = word1.length - i
    }

    // Iterate over the strings in reverse order to fill the dp table
    for (let i = word1.length - 1; i >= 0; i--) {
      for (let j = word2.length - 1; j >= 0; j--) {
        if (word1[i] === word2[j]) {
          // If characters match, no operation is needed
          dp[i][j] = dp[i + 1][j + 1]
        } else {
          // If characters don't match, consider the minimum of the three operations: insert, delete, replace
          dp[i][j] = 1 + Math.min(dp[i + 1][j], Math.min(dp[i][j + 1], dp[i + 1][j + 1]))
        }
      }
    }

    // The result is stored in dp[0][0]
    return dp[0][0]
  }
}

console.log(new Solution().minDistance('horse', 'ros')) // 3
