// 123. Best Time to Buy and Sell Stock III
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete at most two transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
//
// Example 1:
// Input: prices = [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
//              Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
//              Total profit is 3 + 3 = 6.
//
// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 2 and buy on day 3 to sell later, as you are
//              engaging multiple transactions at the same time. You must sell before buying again.
//
// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.
//
// Constraints:
// 1 <= prices.length <= 10^5
// 0 <= prices[i] <= 10^5

/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit_dfs(prices) {
  // Use memoization to store previously computed results
  // Key: "day-holding-transactions" where:
  // - day: current day index
  // - holding: 1 if we currently hold stock, 0 if we don't
  // - transactions: number of transactions completed (0, 1, or 2)
  const memo = new Map();
  
  // Main recursive function that calculates max profit from a given day
  // day: current day index
  // holding: 1 if we currently hold stock, 0 if we don't
  // transactions: number of completed transactions so far
  const dfs = (day, holding, transactions) => {
    // Create unique key for memoization
    const key = `${day}-${holding}-${transactions}`;
    
    // Return cached result if it exists
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Base case 1: if we've reached the end of the price array
    if (day >= prices.length) {
      return 0;
    }
    
    // Base case 2: if we've completed 2 transactions, no more profit possible
    if (transactions >= 2) {
      return 0;
    }
    
    let maxProfit = 0;
    
    if (holding === 1) {
      // We currently hold stock, so we can either:
      // 1. Sell the stock today (complete a transaction) and continue without stock
      // 2. Keep holding the stock and move to next day
      const sellToday = prices[day] + dfs(day + 1, 0, transactions + 1);
      const keepHolding = dfs(day + 1, 1, transactions);
      maxProfit = Math.max(sellToday, keepHolding);
    } else {
      // We don't hold stock, so we can either:
      // 1. Buy stock today (start a transaction) and continue with stock
      // 2. Skip today and move to next day without stock
      const buyToday = -prices[day] + dfs(day + 1, 1, transactions);
      const skipToday = dfs(day + 1, 0, transactions);
      maxProfit = Math.max(buyToday, skipToday);
    }
    
    // Cache the result before returning
    memo.set(key, maxProfit);
    return maxProfit;
  };
  
  // Start from day 0 without holding any stock and 0 transactions completed
  return dfs(0, 0, 0);
}

// Example Usage:
console.log(maxProfit_dfs([3,3,5,0,0,3,1,4])); // Expected: 6
console.log(maxProfit_dfs([1,2,3,4,5])); // Expected: 4
console.log(maxProfit_dfs([7,6,4,3,1])); // Expected: 0
console.log(maxProfit_dfs([1,2,4,2,5,7,2,4,9,0])); // Expected: 13