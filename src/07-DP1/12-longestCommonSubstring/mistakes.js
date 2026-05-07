class Solution {
  /**
   * @param {string} text1
   * @param {string} text2
   * @return {number}
   */
  longestCommonSubsequence(text1, text2) {
      const dp = Array(text1.length + 1).fill().map(r => Array(text2.length + 1).fill(0));
      // console.log(dp)
      let max = 0;
      for (let i = 1; i <= text1.length; i++) {
          for (let j = 1; j <= text2.length; j++) {
              if (text1[i - 1] === text2[j - 1]) {
                  dp[i][j] = 1 + dp[i - 1][j - 1];
                  max = Math.max(max,  dp[i][j])
              } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
              }
          }
      }

      return max
  }
}
