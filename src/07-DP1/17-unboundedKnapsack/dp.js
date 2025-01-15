// https://neetcode.io/problems/unboundedKnapsack
// You are given a list of items,
// each with a weight and a profit, along with a backpack
// with a specified maximum capacity.
//  Your goal is to calculate the maximum profit you can achieve
//  without exceeding the backpack's capacity.
// You must select items such that the total weight of the items
// is less than or equal to the backpack's capacity.
// Assume you can select each item up to an unlimited n
// umber of times.

// Input:
// profit = [4, 4, 7, 1]
// weight = [5, 2, 3, 1]
// capacity = 8

// Output:
// 18

class Solution {
  /**
   * @param {<Array<number>} profit - Array of item profits
   * @param {<Array<number>} weight - Array of item weights
   * @param {number} capacity - Max capacity of the knapsack
   * @returns {number} - Maximum profit achievable
   */
  maximumProfitDp (profit, weight, capacity) {
    // Number of items
    const n = profit.length
    // Memo to store subproblem results: key -> 'index-capacity'
    const dp = Array.from({ length: n }, () => Array(capacity + 1).fill(0))

    // Initialize first row
    for (let c = 1; c <= capacity; c++) {
      dp[0][c] = (weight[0] <= c) ? profit[0] : 0
    }

    // Fill the dp table
    for (let i = 1; i < n; i++) {
      for (let c = 1; c <= capacity; c++) {
        // If current item can fit, choose max of including or excluding
        if (weight[i] <= c) {
          dp[i][c] = Math.max(
            profit[i] + dp[i][c - weight[i]],
            dp[i - 1][c]
          )
        } else {
          // Skip current item
          dp[i][c] = dp[i - 1][c]
        }
      }
    }

    // Return the result
    return dp[n - 1][capacity]
  }        