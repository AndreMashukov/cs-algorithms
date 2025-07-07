// Problem: Best Time to Buy and Sell Stock II
// LeetCode URL: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
// On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. 
// However, you can buy it then immediately sell it on the same day.
// Find and return the maximum profit you can achieve.
//
// Example 1:
// Input: prices = [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
// Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
// Total profit is 4 + 3 = 7.
//
// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
// Total profit is 4.
//
// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
//
// Constraints:
// - 1 <= prices.length <= 3 * 10^4
// - 0 <= prices[i] <= 10^4

/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit_dp(prices) {
  // Edge case: if no prices or only one price, no profit can be made
  if (prices.length <= 1) {
    return 0;
  }
  
  const n = prices.length;
  
  // Initialize DP arrays
  // dp[i][0] = maximum profit on day i when not holding stock
  // dp[i][1] = maximum profit on day i when holding stock
  const dp = Array(n).fill(null).map(() => Array(2).fill(0));
  
  // Base cases for day 0
  dp[0][0] = 0; // Not holding stock on day 0 means no transactions yet
  dp[0][1] = -prices[0]; // Holding stock on day 0 means we bought it today
  
  // Fill the DP table for each day
  for (let i = 1; i < n; i++) {
    // Calculate maximum profit when not holding stock on day i
    // Either we didn't have stock yesterday and continue not having it
    // Or we had stock yesterday and sold it today
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    
    // Calculate maximum profit when holding stock on day i
    // Either we had stock yesterday and continue holding it
    // Or we didn't have stock yesterday and bought it today
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i]);
  }
  
  // Return final result: maximum profit on last day without holding stock
  // We want to end without stock because holding stock at the end gives no benefit
  return dp[n-1][0];
}

// Example Usage:
console.log(maxProfit_dp([7, 1, 5, 3, 6, 4])); // Expected: 7
console.log(maxProfit_dp([1, 2, 3, 4, 5])); // Expected: 4
console.log(maxProfit_dp([7, 6, 4, 3, 1])); // Expected: 0
console.log(maxProfit_dp([1, 2])); // Expected: 1