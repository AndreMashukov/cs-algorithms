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
//              Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
//              Total profit is 4 + 3 = 7.
//
// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
//              Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
//              engaging multiple transactions at the same time. You must sell before buying again.
//
// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.
//
// Constraints:
// 1 <= prices.length <= 3 * 10^4
// 0 <= prices[i] <= 10^4

/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit_dfs(prices) {
  // Use memoization to store previously computed results
  // Key: "day-holding" where day is current day and holding is 0 or 1
  const memo = new Map();
  
  // Main recursive function that calculates max profit from a given day
  // day: current day index
  // holding: 1 if we currently hold stock, 0 if we don't
  const dfs = (day, holding) => {
    // Create unique key for memoization
    const key = `${day}-${holding}`;
    
    // Return cached result if it exists
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Base case: if we've reached the end of the price array
    if (day >= prices.length) {
      return 0;
    }
    
    let maxProfit = 0;
    
    if (holding === 1) {
      // We currently hold stock, so we can either:
      // 1. Sell the stock today and get profit + continue without stock
      // 2. Keep holding the stock and move to next day
      const sellToday = prices[day] + dfs(day + 1, 0);
      const keepHolding = dfs(day + 1, 1);
      maxProfit = Math.max(sellToday, keepHolding);
    } else {
      // We don't hold stock, so we can either:
      // 1. Buy stock today (subtract price) and continue with stock
      // 2. Skip today and move to next day without stock
      const buyToday = -prices[day] + dfs(day + 1, 1);
      const skipToday = dfs(day + 1, 0);
      maxProfit = Math.max(buyToday, skipToday);
    }
    
    // Cache the result before returning
    memo.set(key, maxProfit);
    return maxProfit;
  };
  
  // Start from day 0 without holding any stock
  return dfs(0, 0);
}

// Example Usage:
console.log(maxProfit_dfs([7,1,5,3,6,4])); // Expected: 7
console.log(maxProfit_dfs([1,2,3,4,5])); // Expected: 4
console.log(maxProfit_dfs([7,6,4,3,1])); // Expected: 0
console.log(maxProfit_dfs([1,2,1,2,1])); // Expected: 2