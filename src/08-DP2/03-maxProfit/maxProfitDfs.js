/**
 * This function calculates the maximum profit that can be achieved from buying and selling stocks,
 * given an array of prices where prices[i] is the price of a given stock on the ith day.
 * You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times)
 * with the constraint that you may not engage in multiple transactions at the same time
 * (i.e., you must sell the stock before you buy again).
 * Additionally, after you sell your stock,
 * you cannot buy stock on the next day (i.e., cooldown one day).
 *
 * @param {number[]} prices - An array of stock prices.
 * @return {number} - The maximum profit.
 */
function maxProfit (prices) {
  // A map to store the results of subproblems to avoid redundant calculations.
  const dp = new Map()

  /**
   * This is a helper function that uses depth-first search (DFS) to explore all possible states.
   * It uses memoization to store results of subproblems.
   *
   * @param {number} i - The current day index.
   * @param {boolean} buying - A boolean indicating whether we are in a buying state.
   * @return {number} - The maximum profit from day i onwards.
   */
  function dfs (i, buying) {
    // Base case: If we have gone through all the days, return 0 profit.
    if (i >= prices.length) {
      return 0
    }

    // Create a unique key for the current state.
    const key = `${i}-${buying}`

    // If the result for this state is already computed, return it.
    if (dp.has(key)) {
      return dp.get(key)
    }

    // Calculate the profit if we decide to cooldown (do nothing) on day i.
    const cooldown = dfs(i + 1, buying)

    if (buying) {
      // If we are in a buying state, we have two choices:
      // 1. Buy the stock on day i and move to the next day in a selling state.
      // 2. Do nothing (cooldown).
      const buy = dfs(i + 1, !buying) - prices[i]
      // Store the maximum profit of the two choices in the dp map.
      dp.set(key, Math.max(buy, cooldown))
    } else {
      // If we are in a selling state, we have two choices:
      // 1. Sell the stock on day i and move to the day after the next in a buying state (due to cooldown).
      // 2. Do nothing (cooldown).
      const sell = dfs(i + 2, !buying) + prices[i]
      // Store the maximum profit of the two choices in the dp map.
      dp.set(key, Math.max(sell, cooldown))
    }

    // Return the stored result for the current state.
    return dp.get(key)
  }

  // Start the DFS from day 0 in a buying state.
  return dfs(0, true)
}

// Example usage:
// The maximum profit that can be achieved from the given prices array is 3.
maxProfit([1, 2, 3, 0, 2]) // 3
