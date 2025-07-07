// 122. Best Time to Buy and Sell Stock II
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/
// You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).
// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: prices = [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
//              Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.

// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

/**
 * Greedy approach: Buy whenever the price goes up the next day
 * This is optimal because we can make unlimited transactions
 * @param {number[]} prices - Array of stock prices
 * @return {number} - Maximum profit achievable
 */
const maxProfit = (prices) => {
  if (prices.length <= 1) return 0
  
  let profit = 0
  
  // For each day, if tomorrow's price is higher than today's, buy today and sell tomorrow
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += prices[i + 1] - prices[i]
    }
  }
  
  return profit
}

/**
 * Dynamic Programming approach: Track buy and sell states
 * @param {number[]} prices - Array of stock prices
 * @return {number} - Maximum profit achievable
 */
const maxProfitDP = (prices) => {
  if (prices.length <= 1) return 0
  
  let buy = -prices[0]  // Maximum profit when holding stock
  let sell = 0          // Maximum profit when not holding stock
  
  for (let i = 1; i < prices.length; i++) {
    // Update buy: either keep previous buy state or buy today
    buy = Math.max(buy, sell - prices[i])
    
    // Update sell: either keep previous sell state or sell today
    sell = Math.max(sell, buy + prices[i])
  }
  
  return sell
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4])) // Expected: 7
console.log(maxProfit([1,2,3,4,5])) // Expected: 4
console.log(maxProfit([7,6,4,3,1])) // Expected: 0

console.log(maxProfitDP([7,1,5,3,6,4])) // Expected: 7
console.log(maxProfitDP([1,2,3,4,5])) // Expected: 4
console.log(maxProfitDP([7,6,4,3,1])) // Expected: 0

module.exports = { maxProfit, maxProfitDP }