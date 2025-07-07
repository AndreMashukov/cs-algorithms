// Problem: Best Time to Buy and Sell Stock II
// LeetCode URL: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
// On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time.
// However, you can buy it then immediately sell it on the same day.
// Find and return the maximum profit you can achieve.

/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit_dp(prices) {
  const n = prices.length;
  
  // If there's only one day or no days, no profit can be made
  if (n <= 1) return 0;
  
  // Initialize DP table with 2 dimensions:
  // dp[i][0] = maximum profit on day i when we don't hold stock
  // dp[i][1] = maximum profit on day i when we hold stock
  const dp = Array(n).fill(null).map(() => Array(2).fill(0));
  
  // Base cases for day 0:
  // If we don't hold stock on day 0, profit is 0
  dp[0][0] = 0;
  // If we hold stock on day 0, we must have bought it, so profit is negative
  dp[0][1] = -prices[0];
  
  // Fill the DP table for each day
  for (let i = 1; i < n; i++) {
    // Case 1: We don't hold stock on day i
    // We can either:
    // - Continue not holding stock from previous day: dp[i-1][0]
    // - Sell the stock we held from previous day: dp[i-1][1] + prices[i]
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    
    // Case 2: We hold stock on day i
    // We can either:
    // - Continue holding stock from previous day: dp[i-1][1]
    // - Buy stock today: dp[i-1][0] - prices[i]
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i]);
  }
  
  // The final answer is the maximum profit on the last day without holding stock
  // We don't want to end with holding stock as we want to maximize profit
  return dp[n-1][0];
}

// Optimized space solution using only two variables
function maxProfit_dp_optimized(prices) {
  const n = prices.length;
  if (n <= 1) return 0;
  
  // hold: maximum profit when holding stock
  // sold: maximum profit when not holding stock
  let hold = -prices[0];  // Initially we buy on day 0
  let sold = 0;           // Initially we don't hold stock
  
  for (let i = 1; i < n; i++) {
    // Update sold: either stay sold or sell today
    const newSold = Math.max(sold, hold + prices[i]);
    // Update hold: either stay holding or buy today
    const newHold = Math.max(hold, sold - prices[i]);
    
    sold = newSold;
    hold = newHold;
  }
  
  return sold;
}

// Example Usage:
console.log(maxProfit_dp([7,1,5,3,6,4])); // Expected: 7
console.log(maxProfit_dp([1,2,3,4,5])); // Expected: 4
console.log(maxProfit_dp([7,6,4,3,1])); // Expected: 0
console.log(maxProfit_dp([1,2,1,2,1])); // Expected: 2