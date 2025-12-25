class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  numDecodings(s) {
      const dp = {};
      const n = s.length;

      if (s[0] === "0") {
          return 0
      }

      dp[n] = 1;
      const dfs = (i) => {
          if (i >= n) {
              return 1
          }

          if (dp[i] !== undefined) {
              return dp[i]
          }

          if (dp[i] === "0") {
              return 0
          }

          let res = dfs(i + 1);
          if (i < n - 1 && (s[i] === "1" || (s[i] === "2" && s[i + 1] <= "6"))) {
              res += dfs(i + 2)
          }

          dp[i] = res;
          return res
      }

      dfs(0);
      return dp[0]
  }
}
