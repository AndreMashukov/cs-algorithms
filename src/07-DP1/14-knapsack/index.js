// https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1
// You are given the weights and values of items,
// and you need to put these items in a knapsack of capacity capacity
// to achieve the maximum total value in the knapsack.
// \Each item is available in only one quantity.

const knapsack = (weights, values, capacity) => {
  const n = weights.length
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        )
      } else {
        dp[i][w] = dp[i - 1][w]
      }
    }
  }

  return dp[n][capacity]
}
