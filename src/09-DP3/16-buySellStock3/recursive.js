// 123. Best Time to Buy and Sell Stock III
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/?envType=problem-list-v2&envId=dynamic-programming
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
function maxProfit_dfs(prices) {
  // Map to store memoized results where key is "day,transactions,holding" string
  const memo = new Map();
  
  /**
   * DFS function to calculate maximum profit
   * @param {number} day - Current day index
   * @param {number} transactions - Number of complete transactions made so far
   * @param {boolean} holding - Whether we're currently holding stock
   * @return {number} Maximum profit from this state onward
   */
  const dfs = (day, transactions, holding) => {
    // Base case: reached the end of prices array
    if (day >= prices.length) {
      return 0;
    }
    
    // Base case: already made 2 transactions
    if (transactions === 2) {
      return 0;
    }
    
    // Create unique key for memoization
    const key = `${day},${transactions},${holding}`;
    
    // Check if we've already computed this state
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    let result;
    
    if (holding) {
      // We're currently holding stock, so we can either:
      // 1. Sell it today (complete a transaction) and move to next day
      // 2. Do nothing (hold) and move to next day with stock
      const sell = prices[day] + dfs(day + 1, transactions + 1, false); // Selling completes a transaction
      const hold = dfs(day + 1, transactions, true); // Continue holding, no transaction completed
      result = Math.max(sell, hold);
    } else {
      // We're not holding stock, so we can either:
      // 1. Buy stock today and move to next day with stock
      // 2. Do nothing and move to next day without stock
      const buy = -prices[day] + dfs(day + 1, transactions, true); // Buying doesn't complete a transaction
      const skip = dfs(day + 1, transactions, false); // Skip this day
      result = Math.max(buy, skip);
    }
    
    // Memoize the result before returning
    memo.set(key, result);
    return result;
  };
  
  // Start from day 0 with 0 transactions and not holding stock
  return dfs(0, 0, false);
}

// Example Usage:
console.log(maxProfit_dfs([3, 3, 5, 0, 0, 3, 1, 4])); // Expected: 6
console.log(maxProfit_dfs([1, 2, 3, 4, 5])); // Expected: 4
console.log(maxProfit_dfs([7, 6, 4, 3, 1])); // Expected: 0
console.log(maxProfit_dfs([1, 2, 4, 2, 5, 7, 2, 4, 9])); // Expected: 13