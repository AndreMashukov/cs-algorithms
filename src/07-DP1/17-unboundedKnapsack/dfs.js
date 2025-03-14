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
  maximumProfitDfs (profit, weight, capacity) {
    // Number of items
    const n = profit.length
    // Memo to store subproblem results: key -> 'index-capacity'
    const map = new Map()

    /**
     * DFS helper function for unbounded knapsack
     * @param {number} i - current index of item
     * @param {number} cap - remaining capacity
     * @returns {number} - max profit from this state
     */
    const dfs = (i, cap) => {
      // Base case: no more items or capacity
      if (i === n || cap === 0) {
        return 0
      }

      // Check memoized result
      if (map.has(`${i}-${cap}`)) {
        return map.get(`${i}-${cap}`)
      }

      let profit1 = 0
      // If current item can fit, choose to stay on same index (unbounded)
      if (weight[i] <= cap) {
        profit1 = profit[i] + dfs(i, cap - weight[i])
      }
      // Option: move to next item without including current
      const profit2 = dfs(i + 1, cap)

      // Take the best option
      const maxProfit = Math.max(profit1, profit2)
      map.set(`${i}-${cap}`, maxProfit)
      return maxProfit
    }

    // Start recursion from 0th item and full capacity
    return dfs(0, capacity)
  }
}
