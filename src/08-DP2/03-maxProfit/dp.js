/**
 * Calculates the maximum profit from buying and selling stocks with a 1-day cooldown.
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  // Edge case: If there are fewer than 2 days, no transaction can be completed
  if (!prices || prices.length <= 1) return 0;

  // Initial states before the first day
  let held = -Infinity; // Maximum profit if we end the day holding a stock
  let sold = 0;         // Maximum profit if we end the day having just sold a stock
  let rest = 0;         // Maximum profit if we end the day doing nothing (ready to buy)

  for (let price of prices) {
      // Keep track of yesterday's 'sold' state before we update it
      let prevSold = sold;
      
      // Transition to 'sold': We must have been 'holding' yesterday, and we sell today
      sold = held + price;
      
      // Transition to 'held': Either we keep holding from yesterday, 
      // or we buy today (must transition from 'rest' state)
      held = Math.max(held, rest - price);
      
      // Transition to 'rest': Either we keep resting from yesterday, 
      // or we transition from yesterday's 'sold' state (cooldown fulfilled)
      rest = Math.max(rest, prevSold);
  }

  // The maximum profit at the end will be either in the 'rest' state or 'sold' state.
  // (It is never optimal to end the last day holding a stock).
  return Math.max(rest, sold);
};


class Solution {
  /**
   * Problem: Best Time to Buy and Sell Stock with Cooldown
   * You can only hold 1 stock at a time
   * After selling, you must cooldown for 1 day before buying again
   * @param {number[]} prices - Daily stock prices
   * @return {number} - Maximum profit possible
   */
  maxProfit (prices) {
    const n = prices.length
    // dp[i][j]: max profit on day i where j=0 means we can buy, j=1 means we can sell
    // Each cell contains max profit possible if we start from day i with state j
    const dp = Array.from({ length: n + 1 }, () => [0, 0])

    for (let i = n - 1; i >= 0; i--) {
      for (let buying = 1; buying >= 0; buying--) {
        if (buying === 1) {
          // When we can buy: either buy today or wait
          const buy = dp[i + 1][0] - prices[i] // Buy today, switch to selling state
          const cooldown = dp[i + 1][1] // Don't buy, stay in buying state
          dp[i][1] = Math.max(buy, cooldown)
        } else {
          // When we can sell: either sell today (with cooldown) or wait
          const sell = i + 2 < n ? dp[i + 2][1] + prices[i] : prices[i] // Sell with cooldown
          const cooldown = dp[i + 1][0] // Don't sell, stay in selling state
          dp[i][0] = Math.max(sell, cooldown)
        }
      }
    }
    // console.log(dp)
    // [ [ 4, 3 ], [ 4, 2 ], [ 3, 2 ], [ 2, 2 ], [ 2, 0 ], [ 0, 0 ] ]
    // Return max profit starting from day 0 in buying state
    return dp[0][1]   // 3
  }
}

console.log(new Solution().maxProfit([1, 2, 3, 0, 2])) // Expected output: 3
