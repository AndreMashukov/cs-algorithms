class Solution {
  /**
   * Problem: Best Time to Buy and Sell Stock with Cooldown
   * You can only hold 1 stock at a time
   * After selling, you must cooldown for 1 day before buying again
   * @param {number[]} prices - Daily stock prices
   * @return {number} - Maximum profit possible
   */
  maxProfit (prices) {
    const n = prices.length
    // dp[i][j]: max profit on day i where j=0 means we can buy, j=1 means we can sell
    // Each cell contains max profit possible if we start from day i with state j
    const dp = Array.from({ length: n + 1 }, () => [0, 0])

    for (let i = n - 1; i >= 0; i--) {
      for (let buying = 1; buying >= 0; buying--) {
        if (buying === 1) {
          // When we can buy: either buy today or wait
          const buy = dp[i + 1][0] - prices[i] // Buy today, switch to selling state
          const cooldown = dp[i + 1][1] // Don't buy, stay in buying state
          dp[i][1] = Math.max(buy, cooldown)
        } else {
          // When we can sell: either sell today (with cooldown) or wait
          const sell = i + 2 < n ? dp[i + 2][1] + prices[i] : prices[i] // Sell with cooldown
          const cooldown = dp[i + 1][0] // Don't sell, stay in selling state
          dp[i][0] = Math.max(sell, cooldown)
        }
      }
    }
    // Return max profit starting from day 0 in buying state
    return dp[0][1]
  }
}

console.log(new Solution().maxProfit([1, 2, 3, 0, 2])) // Expected output: 3
