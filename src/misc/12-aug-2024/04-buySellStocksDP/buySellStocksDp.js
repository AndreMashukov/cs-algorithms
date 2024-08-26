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
  // If k is large enough, we can make every possible profitable transaction
  if (k >= n / 2) {
    let profit = 0
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1]
      }
    }
    return profit
  }

  // dp[i][j] represents the maximum profit up to day j with at most i transactions
  const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0))
  // Iterate over the transactions and days to fill the dp array with the maximum profit
  for (let i = 1; i <= k; i++) {
    let maxSoFar = -prices[0]
    // Iterate over the days
    for (let j = 1; j < n; j++) {
      // The maximum profit up to day j with at most i transactions
      // is the maximum of the previous maximum profit
      dp[i][j] = Math.max(dp[i][j - 1], prices[j] + maxSoFar)
      // The maximum profit up to day j with at most i transactions
      maxSoFar = Math.max(maxSoFar, dp[i - 1][j] - prices[j])
    }
  }
  return dp[k][n - 1]
}

console.log(maxProfit([3, 2, 6, 5, 0, 3], 2)) // Should be 7 !!!
