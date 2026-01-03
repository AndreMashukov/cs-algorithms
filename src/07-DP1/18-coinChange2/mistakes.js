class Solution {
  /**
   * @param {number} amount
   * @param {number[]} coins
   * @return {number}
   */
  change(amount, coins) {
      let dp = Array(amount + 1).fill(0);
      dp[0] = 1;

      for (let i = coins.length - 1; i >= 0; i--) {
          const nextDp = Array(amount + 1).fill(0);
          nextDp[0] = 1;

          for (let a = 1; a <= amount; a++) {
              nextDp[a] = dp[a]
              if (a - coins[i] >= 0) {
                  nextDp[a] += dp[a - coins[i]]
              }
          }

          dp = nextDp
      }

      return dp[amount]
  }
}
