// You are given an integer array cost where cost[i] is the cost
// of ith step on a staircase. Once you pay the cost,
// you can either climb one or two steps.

// You can either start from the step with index 0,
// or the step with index 1.

// Return the minimum cost to reach the top of the floor.

const minCostClimbingStairs = (cost) => {
  const n = cost.length
  const dp = new Array(n + 1).fill(0)

  for (let i = 2; i <= n; i += 1) {
    // Climb one step from the previous step or Climb two steps from the step before the previous one
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    // dp[i - 1] + cost[i - 1] is the cost of reaching the ith step from the (i - 1)th step
  }

  return dp[n]
}

// Input: cost = [10,15,20]
// Output: 15
// Explanation: You will start at index 1.
// - Pay 15 and climb two steps to reach the top.
// The total cost is 15.

// Input: cost = [1,100,1,1,1,100,1,1,100,1]
// Output: 6
// Explanation: You will start at index 1.
// - Pay 100 and climb 2 steps to reach the top.
// The total cost is 100.
// Constraints:

// 2 <= cost.length <= 1000
// 0 <= cost[i] <= 999
