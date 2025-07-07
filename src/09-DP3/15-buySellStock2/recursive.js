// 122. Best Time to Buy and Sell Stock II
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=problem-list-v2&envId=dynamic-programming
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
function maxProfit_dfs(prices) {
  // Map to store memoized results where key is "day,holding" string
  const memo = new Map();
  
  /**
   * DFS function to calculate maximum profit
   * @param {number} day - Current day index
   * @param {boolean} holding - Whether we're currently holding stock
   * @return {number} Maximum profit from this state onward
   */
  const dfs = (day, holding) => {
    // Base case: reached the end of prices array
    if (day >= prices.length) {
      return 0;
    }
    
    // Create unique key for memoization
    const key = `${day},${holding}`;
    
    // Check if we've already computed this state
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    let result;
    
    if (holding) {
      // We're currently holding stock, so we can either:
      // 1. Sell it today and move to next day without stock
      // 2. Do nothing (hold) and move to next day with stock
      const sell = prices[day] + dfs(day + 1, false); // Profit from selling + future profit without stock
      const hold = dfs(day + 1, true); // Future profit while still holding stock
      result = Math.max(sell, hold);
    } else {
      // We're not holding stock, so we can either:
      // 1. Buy stock today and move to next day with stock
      // 2. Do nothing and move to next day without stock
      const buy = -prices[day] + dfs(day + 1, true); // Cost of buying + future profit with stock
      const skip = dfs(day + 1, false); // Future profit without stock
      result = Math.max(buy, skip);
    }
    
    // Memoize the result before returning
    memo.set(key, result);
    return result;
  };
  
  // Start from day 0 with no stock
  return dfs(0, false);
}

// Example Usage:
console.log(maxProfit_dfs([7, 1, 5, 3, 6, 4])); // Expected: 7
console.log(maxProfit_dfs([1, 2, 3, 4, 5])); // Expected: 4
console.log(maxProfit_dfs([7, 6, 4, 3, 1])); // Expected: 0
console.log(maxProfit_dfs([1, 2])); // Expected: 1