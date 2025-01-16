// 188. Best Time to Buy and Sell Stock IV
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/
// We need to find the maximum profit
// that can be achieved with at most k transactions
// on a given list of stock prices.
// A transaction consists of buying and
// then selling one share of the stock.

// Input: prices = [3, 2, 6, 5, 0, 3], k = 2
// Output: 7
// Explanation:
// Buy on day 2 (price = 2) and sell on day 3 (price = 6),
// profit = 6-2 = 4.
// Then buy on day 5 (price = 0) and sell on day 6 (price = 3),
// profit = 3-0 = 3.

const maxProfit = (prices, k) => {
  if (!prices.length) return 0
  const n = prices.length
  // dp[i][j] represents the maximum profit up to day j with at most i transactions
  const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0))
  // Iterate over the transactions and days to fill the dp array with the maximum profit
  for (let i = 1; i <= k; i++) {
    // Iterate over the days
    for (let j = 1; j < n; j++) {
      let maxVal = 0
      // `m` represents the day before the current day `j`
      for (let m = 0; m < j; m++) {
        // The maximum profit up to day j with at most i transactions
        // here we are trying to maximize the profit by buying on day `m` and selling on day `j`
        maxVal = Math.max(maxVal, prices[j] - prices[m] + dp[i - 1][m])
        // dp[i - 1][m] represents the maximum profit up to day m with at most i - 1 transactions
      }
      // dp[i][j - 1] represents the maximum profit up to day j - 1 with at most i transactions
      // means we are not doing any transaction on day j
      dp[i][j] = Math.max(dp[i][j - 1], maxVal)
    }
  }
  return dp[k][n - 1]
}

console.log(maxProfit([3, 2, 6, 5, 0, 3], 2)) // Should be 7 !!!
