class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  numDecodings (s) {
    if (s === '0') {
      return 0
    }
    if (s.length === 1) {
      return 1
    }

    const n = s.length

    const dp = new Array(n + 1).fill(0)

    dp[n] = 1

    for (let i = n - 1; i >= 0; i--) {
      if (s[i] === '0') {
        dp[i] = 0
      } else {
        dp[i] = dp[i + 1]
        if (i + 1 > n && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
          dp[i] += dp[i + 2]
        }
      }
    }
    console.log(dp)
    return dp[0]
  }
}
