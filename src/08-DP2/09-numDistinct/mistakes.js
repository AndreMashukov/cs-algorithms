/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
  const dp = Array(s.length + 1).fill().map(() => Array(t.length + 1).fill(0));
  
  for (let i = 0; i <= s.length; i++) {
    dp[i][t.length] = 1
  }

  // console.log(dp)

  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = t.length - 1; j >= 0; j--) {
      if (s[i + 1] === t[j + 1]) {
        dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j]
      } else {
        dp[i][j] = dp[i + 1][j]
      }
    }
  }

  return dp[0][0]
};