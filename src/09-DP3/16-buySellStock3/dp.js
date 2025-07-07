// Problem: Best Time to Buy and Sell Stock III
// LeetCode URL: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete at most two transactions.
// Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).
//
// Example 1:
// Input: prices = [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
// Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
//
// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
// Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging
// multiple transactions at the same time. You must sell before buying again.
//
// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e., max profit = 0.
//
// Constraints:
// - 1 <= prices.length <= 10^5
// - 0 <= prices[i] <= 10^5

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
  const k = 2; // Maximum number of transactions allowed
  
  // Initialize DP array
  // dp[i][j][0] = max profit on day i with at most j transactions and NOT holding stock
  // dp[i][j][1] = max profit on day i with at most j transactions and holding stock
  const dp = Array(n).fill(null).map(() => 
    Array(k + 1).fill(null).map(() => 
      Array(2).fill(0)
    )
  );
  
  // Base cases for day 0
  for (let j = 1; j <= k; j++) {
    dp[0][j][0] = 0; // Not holding stock on day 0
    dp[0][j][1] = -prices[0]; // Holding stock on day 0 (bought it)
  }
  
  // Fill the DP table
  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      // Calculate max profit when not holding stock on day i with at most j transactions
      // Either we didn't have stock yesterday, or we sold it today (completing a transaction)
      dp[i][j][0] = Math.max(
        dp[i-1][j][0], // Didn't have stock yesterday
        dp[i-1][j][1] + prices[i] // Sold stock today
      );
      
      // Calculate max profit when holding stock on day i with at most j transactions
      // Either we had stock yesterday, or we bought it today (using one of our transactions)
      dp[i][j][1] = Math.max(
        dp[i-1][j][1], // Had stock yesterday
        dp[i-1][j-1][0] - prices[i] // Bought stock today (uses one transaction slot)
      );
    }
  }
  
  // Return final result: max profit on last day with at most k transactions, not holding stock
  return dp[n-1][k][0];
}

// Example Usage:
console.log(maxProfit_dp([3, 3, 5, 0, 0, 3, 1, 4])); // Expected: 6
console.log(maxProfit_dp([1, 2, 3, 4, 5])); // Expected: 4
console.log(maxProfit_dp([7, 6, 4, 3, 1])); // Expected: 0
console.log(maxProfit_dp([1, 2, 4, 2, 5, 7, 2, 4, 9])); // Expected: 13