// 17. Unbounded Knapsack
// https://neetcode.io/problems/unboundedKnapsack
// Problem Description:
// You are given a list of items, each with a weight and a profit, along with a backpack
// with a specified maximum capacity. Your goal is to calculate the maximum profit you can achieve
// without exceeding the backpack's capacity. You must select items such that the total weight of the items
// is less than or equal to the backpack's capacity. Assume you can select each item up to an unlimited number of times.

// Example 1:
// Input: profit = [4, 4, 7, 1], weight = [5, 2, 3, 1], capacity = 8
// Output: 18

// Constraints:
// 1 <= profit.length == weight.length <= 1000
// 1 <= profit[i] <= 1000
// 1 <= weight[i] <= 1000
// 1 <= capacity <= 10000

/**
 * @param {number[]} profit - Array of item profits
 * @param {number[]} weight - Array of item weights
 * @param {number} capacity - Max capacity of the knapsack
 * @return {number} - Maximum profit achievable
 */
function unboundedKnapsack_dfs(profit, weight, capacity) {
  const n = profit.length; // Number of items
  const memo = new Map(); // Memoization map to store subproblem results

  const dfs = (i, rem) => { // DFS function to find max profit
    if (i === n || rem === 0) { // Base case: no more items or capacity
      return 0;
    }
    if (memo.has(`${i}-${rem}`)) { // Check memoized result
      return memo.get(`${i}-${rem}`);
    }

    let profit1 = 0; // Initialize profit1
    if (weight[i] <= rem) { // If current item can fit
      profit1 = profit[i] + dfs(i, rem - weight[i]); // Include current item
    }
    const profit2 = dfs(i + 1, rem); // Exclude current item

    const maxProfit = Math.max(profit1, profit2); // Take the best option
    memo.set(`${i}-${rem}`, maxProfit); // Cache the result
    return maxProfit; // Return max profit
  };

  return dfs(0, capacity); // Start DFS from 0th item and full capacity
}

// Example Usage:
console.log(unboundedKnapsack_dfs([4, 4, 7, 1], [5, 2, 3, 1], 8)); // Output: 18
