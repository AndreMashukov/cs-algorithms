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
    // we will overwrite this row in the next loop
    for (let c = 1; c <= capacity; c++) {
      dp[0][c] = weight[0] <= c ? profit[0] * Math.floor(c / weight[0]) : 0;
    }

    // console.log(dp)
    // [                | <- capacity = 5 = weight[0]
    //  [0, 0, 0, 0, 0, 4, 4, 4, 4]
    //  [0, 0, 0, 0, 0, 0, 0, 0, 0]
    //  [0, 0, 0, 0, 0, 0, 0, 0, 0]
    //  [0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ]
    // first row is filled with the profit of the first item
    // if the weight of the first item is less than the capacity,
    // then the profit is the profit of the first item
    // times the number of times the first item can fit in the capacity
    // if the weight of the first item is greater than the capacity,
    // then the profit is 0
    

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
}

const solution = new Solution()

const profit = [4, 4, 7, 1]
const weight = [5, 2, 3, 1]
const capacity = 8

console.log(solution.maximumProfitDp(profit, weight, capacity))

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
