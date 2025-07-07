// Problem: Best Time to Buy and Sell Stock III
// LeetCode URL: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete at most two transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit_dp(prices) {
  const n = prices.length;
  
  // If there's only one day or no days, no profit can be made
  if (n <= 1) return 0;
  
  // Initialize 3D DP table with dimensions:
  // dp[i][j][k] = maximum profit on day i with j transactions completed and k holding state
  // i: day (0 to n-1)
  // j: transactions completed (0, 1, or 2)
  // k: holding state (0 = not holding, 1 = holding)
  const dp = Array(n).fill(null).map(() => 
    Array(3).fill(null).map(() => Array(2).fill(0))
  );
  
  // Base cases for day 0:
  // With 0 transactions completed:
  dp[0][0][0] = 0;        // Not holding stock, no transactions
  dp[0][0][1] = -prices[0]; // Holding stock, no transactions (bought on day 0)
  
  // With 1 transaction completed (impossible to complete transaction on day 0):
  dp[0][1][0] = 0;        // Not holding stock, 1 transaction
  dp[0][1][1] = -prices[0]; // Holding stock, 1 transaction
  
  // With 2 transactions completed (impossible on day 0):
  dp[0][2][0] = 0;        // Not holding stock, 2 transactions
  dp[0][2][1] = -prices[0]; // Holding stock, 2 transactions
  
  // Fill the DP table for each day
  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= 2; j++) {
      // Case 1: Not holding stock on day i with j transactions completed
      // We can either:
      // - Continue not holding stock: dp[i-1][j][0]
      // - Sell stock we held yesterday (complete transaction): dp[i-1][j-1][1] + prices[i]
      dp[i][j][0] = dp[i-1][j][0];
      if (j > 0) {
        dp[i][j][0] = Math.max(dp[i][j][0], dp[i-1][j-1][1] + prices[i]);
      }
      
      // Case 2: Holding stock on day i with j transactions completed
      // We can either:
      // - Continue holding stock: dp[i-1][j][1]
      // - Buy stock today: dp[i-1][j][0] - prices[i]
      dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i-1][j][0] - prices[i]);
    }
  }
  
  // The final answer is the maximum profit on the last day without holding stock
  // We check all possible transaction counts (0, 1, 2)
  return Math.max(dp[n-1][0][0], dp[n-1][1][0], dp[n-1][2][0]);
}

// Optimized DP solution using state machine approach
function maxProfit_dp_optimized(prices) {
  const n = prices.length;
  if (n <= 1) return 0;
  
  // State variables representing different transaction states:
  // buy1: maximum profit after buying first stock
  // sell1: maximum profit after selling first stock (completing first transaction)
  // buy2: maximum profit after buying second stock
  // sell2: maximum profit after selling second stock (completing second transaction)
  let buy1 = -prices[0];
  let sell1 = 0;
  let buy2 = -prices[0];
  let sell2 = 0;
  
  for (let i = 1; i < n; i++) {
    // Update in reverse order to avoid using updated values in same iteration
    sell2 = Math.max(sell2, buy2 + prices[i]);  // Sell second stock
    buy2 = Math.max(buy2, sell1 - prices[i]);   // Buy second stock
    sell1 = Math.max(sell1, buy1 + prices[i]);  // Sell first stock
    buy1 = Math.max(buy1, -prices[i]);          // Buy first stock
  }
  
  return sell2;
}

// Example Usage:
console.log(maxProfit_dp([3,3,5,0,0,3,1,4])); // Expected: 6
console.log(maxProfit_dp([1,2,3,4,5])); // Expected: 4
console.log(maxProfit_dp([7,6,4,3,1])); // Expected: 0
console.log(maxProfit_dp([1,2,4,2,5,7,2,4,9,0])); // Expected: 13