// 188. Best Time to Buy and Sell Stock IV
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/
// https://www.youtube.com/watch?v=lJxuwClVN2w
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
  const dp = Array(n).fill(0)

  for (let i = 1; i <= k; i++) {
    let pos = -prices[0]
    let profit = 0
    for (let j = 1; j < n; j++) {
      pos = Math.max(pos, dp[j] - prices[j])
      profit = Math.max(profit, pos + prices[j])
      dp[j] = profit
    }
  }

  return dp[n - 1]
}

console.log(maxProfit([3, 2, 6, 7, 4, 7], 2)) // Should be 8

// // Transaction = 0
// [0, 0, 0, 0, 0, 0]
// // Transaction = 1
// [0, 0, 4, 5, 5, 5]
// // Transaction = 2
// [0, 0, 4, 5, 5, 8]

// profit keeps track of the maximum profit for the current
// transaction up to the current day.

// The dp array is overwritten for each transaction.
// This is efficient because each element in the dp array
// only needs to store the maximum profit up to the current day
// for the current transaction.
