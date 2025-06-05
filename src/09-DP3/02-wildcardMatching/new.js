/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const dp = Array(s.length + 1).fill().map(() => Array(p.length + 1).fill(false));
  dp[0][0] = true;

  for (let j = 1; j <= p.length; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 1]
    }
  }

  // console.log(dp)

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= p.length; j++) {
      const sChar = s[i - 1];
      const pChar = p[j - 1];

      if (pChar === "*") {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
      } else if (sChar === pChar || pChar === "?") {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = false
      }
    }
  }

  return dp[s.length][p.length]
};