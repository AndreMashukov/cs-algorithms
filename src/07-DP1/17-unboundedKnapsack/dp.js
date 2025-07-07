// Problem: Unbounded Knapsack
// LeetCode URL: https://neetcode.io/problems/unboundedKnapsack
// Problem Description:
// You are given a list of items, each with a weight and a profit, along with a backpack
// with a specified maximum capacity. Your goal is to calculate the maximum profit you can achieve
// without exceeding the backpack's capacity. You must select items such that the total weight of the items
// is less than or equal to the backpack's capacity. Assume you can select each item up to an unlimited number of times.

/**
 * @param {number[]} profit - Array of item profits
 * @param {number[]} weight - Array of item weights
 * @param {number} capacity - Max capacity of the knapsack
 * @return {number} - Maximum profit achievable
 */
function unboundedKnapsack_dp(profit, weight, capacity) {
  const n = profit.length; // Number of items
  const dp = Array.from({ length: n }, () => Array(capacity + 1).fill(0)); // DP array to store max profit

  for (let c = 1; c <= capacity; c++) { // Initialize first row
    dp[0][c] = weight[0] <= c ? profit[0] * Math.floor(c / weight[0]) : 0; // Max profit for item 0
  }

  for (let i = 1; i < n; i++) { // Iterate over items
    for (let c = 1; c <= capacity; c++) { // Iterate over capacities
      if (weight[i] <= c) { // If current item can fit
        dp[i][c] = Math.max(
          profit[i] + dp[i][c - weight[i]], // Include current item
          dp[i - 1][c] // Exclude current item
        );
      } else {
        dp[i][c] = dp[i - 1][c]; // Skip current item
      }
    }
  }

  return dp[n - 1][capacity]; // Return max profit for full capacity
}

// Example Usage:
console.log(unboundedKnapsack_dp([4, 4, 7, 1], [5, 2, 3, 1], 8)); // Output: 18

// weights = [1, 3, 4]
// profits = [15, 50, 60]
// capacity = 5

// Item/Capacity
//    0	1	  2	  3	  4	   5
// 0	0	15	30	45	60	75
// 1	0	15	30	50	65	80
// 2	0	15	30	50	65	90

// For capacity = 1, the maximum profit is 15 (using item 0).
// For capacity = 2, the maximum profit is 30 (using item 0 twice).
// For capacity = 3, the maximum profit is 50 (using item 1).
// For capacity = 4, the maximum profit is 65 (using item 1 and item 0).
// For capacity = 5, the maximum profit is 90 (using item 2 and item 0).
