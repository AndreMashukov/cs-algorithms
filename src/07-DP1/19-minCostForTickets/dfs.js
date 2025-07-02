// https://leetcode.com/problems/minimum-cost-for-tickets/
// https://www.youtube.com/watch?v=4Kww-zIkWWY

// You have planned some train traveling one year in advance.
// The days of the year in which you will travel are given as an integer array days.
// Each day is an integer from 1 to 365.

// Train tickets are sold in three different ways:

// a 1-day pass is sold for costs[0] dollars,
// a 7-day pass is sold for costs[1] dollars, and
// a 30-day pass is sold for costs[2] dollars.
// The passes allow that many days of consecutive travel.

// For example, if we get a 7-day pass on day 2,
// then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.
// Return the minimum number of dollars you need
// to travel every day in the given list of days.

// Example 1:

// Input: days = [1,4,6,7,8,20], costs = [2,7,15]
// Output: 11

// Example 2:

// Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
// Output: 17

// Constraints:

// 1 <= days.length <= 365
// 1 <= days[i] <= 365
// days is in strictly increasing order.
// costs.length == 3
// 1 <= costs[i] <= 1000

/**
 * Calculate the minimum cost of tickets required to travel on all specified days
 * using top-down dynamic programming (DFS + memoization)
 * 
 * @param {number[]} days - The days on which we need to travel
 * @param {number[]} costs - The costs of 1-day, 7-day, and 30-day passes
 * @return {number} - The minimum cost to cover all travel days
 */
function minCostTickets_dfs(days, costs) {
  // Memoization map to store already computed results
  const memo = new Map();

  /**
   * DFS function to find minimum cost starting from a particular day index
   * @param {number} i - The current index in the days array
   * @return {number} - Minimum cost from this position to the end
   */
  const dfs = (i) => {
    // Base case: if we've covered all days, no more cost needed
    if (i >= days.length) {
      return 0;
    }
    
    // Return cached result if available
    if (memo.has(i)) {
      return memo.get(i);
    }

    // Initialize with infinity to find minimum
    let res = Infinity;
    // Pass durations corresponding to costs array indices
    const durations = [1, 7, 30];

    // Try each type of pass (1-day, 7-day, 30-day)
    for (let j = 0; j < costs.length; j++) {
      let nextDay = i; // Start from the current day index
      // Calculate the last day covered by this pass
      const expiry = days[i] + durations[j] - 1;
      
      // Find the next day that's not covered by this pass
      while (nextDay < days.length && days[nextDay] <= expiry) {
        nextDay++; // Move to the next day
      }
      
      // Current pass cost + minimum cost for remaining days
      res = Math.min(res, costs[j] + dfs(nextDay));
    }

    // Cache the result
    memo.set(i, res);
    return res; // Return the minimum cost from this index
  };

  // Start DFS from the first day
  return dfs(0);
}

// Example Usage:
console.log(minCostTickets_dfs([1,4,6,7,8,20], [2,7,15])); // Output: 11
console.log(minCostTickets_dfs([1,2,3,4,5,6,7,8,9,10,30,31], [2,7,15])); // Output: 17

// The nextDay variable is used to find the next day index 
// that is NOT covered by the current pass we're considering purchasing. 
// This tells us where to continue our search 
// after buying the current pass.