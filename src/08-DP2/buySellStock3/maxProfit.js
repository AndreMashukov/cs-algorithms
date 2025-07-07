// 123. Best Time to Buy and Sell Stock III
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/
// You may complete at most two transactions.
// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: prices = [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
//              Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
//              engaging multiple transactions at the same time. You must sell before buying again.

// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

/**
 * Optimized Dynamic Programming approach using state machine
 * Track 4 states: buy1, sell1, buy2, sell2
 * @param {number[]} prices - Array of stock prices
 * @return {number} - Maximum profit achievable with at most 2 transactions
 */
const maxProfit = (prices) => {
  if (prices.length <= 1) return 0
  
  // State variables representing maximum profit at each transaction state
  let buy1 = -prices[0]   // Maximum profit after buying first stock
  let sell1 = 0           // Maximum profit after selling first stock
  let buy2 = -prices[0]   // Maximum profit after buying second stock
  let sell2 = 0           // Maximum profit after selling second stock
  
  for (let i = 1; i < prices.length; i++) {
    // Update states in order (later states depend on earlier ones)
    buy1 = Math.max(buy1, -prices[i])           // Buy first stock
    sell1 = Math.max(sell1, buy1 + prices[i])   // Sell first stock
    buy2 = Math.max(buy2, sell1 - prices[i])    // Buy second stock
    sell2 = Math.max(sell2, buy2 + prices[i])   // Sell second stock
  }
  
  return sell2
}

/**
 * General Dynamic Programming approach (can handle k transactions)
 * Using the same approach as Stock IV with k=2
 * @param {number[]} prices - Array of stock prices
 * @return {number} - Maximum profit achievable with at most 2 transactions
 */
const maxProfitDP = (prices) => {
  if (prices.length <= 1) return 0
  
  const k = 2 // At most 2 transactions
  const n = prices.length
  const dp = Array(n).fill(0)
  
  for (let i = 1; i <= k; i++) {
    let pos = -prices[0]    // Maximum profit when holding stock
    let profit = 0          // Maximum profit when not holding stock
    
    for (let j = 1; j < n; j++) {
      pos = Math.max(pos, dp[j] - prices[j])
      profit = Math.max(profit, pos + prices[j])
      dp[j] = profit
    }
  }
  
  return dp[n - 1]
}

/**
 * 2D DP approach for better understanding
 * dp[i][j] = maximum profit using at most i transactions up to day j
 * @param {number[]} prices - Array of stock prices
 * @return {number} - Maximum profit achievable with at most 2 transactions
 */
const maxProfit2D = (prices) => {
  if (prices.length <= 1) return 0
  
  const k = 2 // At most 2 transactions
  const n = prices.length
  
  // dp[i][j] = max profit using at most i transactions up to day j
  const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0))
  
  for (let i = 1; i <= k; i++) {
    let maxDiff = -prices[0] // Maximum of (dp[i-1][m] - prices[m]) for all m < j
    
    for (let j = 1; j < n; j++) {
      // Either don't trade on day j, or sell on day j
      dp[i][j] = Math.max(dp[i][j - 1], prices[j] + maxDiff)
      
      // Update maxDiff for next iteration
      maxDiff = Math.max(maxDiff, dp[i - 1][j] - prices[j])
    }
  }
  
  return dp[k][n - 1]
}

// Test cases
console.log(maxProfit([3,3,5,0,0,3,1,4])) // Expected: 6
console.log(maxProfit([1,2,3,4,5])) // Expected: 4
console.log(maxProfit([7,6,4,3,1])) // Expected: 0
console.log(maxProfit([1,2,4,2,5,7,2,4,9,0])) // Expected: 13

console.log(maxProfitDP([3,3,5,0,0,3,1,4])) // Expected: 6
console.log(maxProfitDP([1,2,3,4,5])) // Expected: 4
console.log(maxProfitDP([7,6,4,3,1])) // Expected: 0

console.log(maxProfit2D([3,3,5,0,0,3,1,4])) // Expected: 6
console.log(maxProfit2D([1,2,3,4,5])) // Expected: 4
console.log(maxProfit2D([7,6,4,3,1])) // Expected: 0

module.exports = { maxProfit, maxProfitDP, maxProfit2D }