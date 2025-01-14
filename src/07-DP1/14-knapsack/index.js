// https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1
// You are given the weights and values of items,
// and you need to put these items in a knapsack of capacity capacity
// to achieve the maximum total value in the knapsack.
// Each item is available in only one quantity.

const knapsack = (weights, values, capacity) => {
  const n = weights.length
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    // w is the current capacity
    for (let c = 1; c <= capacity; c++) {
      if (weights[i - 1] <= c) {
        // if current capacity is greater than the weight of the item
        dp[i][c] = Math.max(
          dp[i - 1][c],
          // take the value from the previous row and left shift by the weight of the item
          dp[i - 1][c - weights[i - 1]] + values[i - 1]
        )
      } else {
        // if current capacity is less than the weight of the item, skip it
        dp[i][c] = dp[i - 1][c]
      }
    }
  }

  return dp[n][capacity]
}

// Weights: [2, 3, 4]
// Values: [3, 4, 5]
// Capacity: 6

//        w=0  w=1  w=2  w=3  w=4  w=5  w=6
// i=0     0    0    0    0    0    0    0
// i=1     0    0    3    3    3    3    3   (item1: w=2,v=3)
// i=2     0    0    3    4    4    7    7   (item2: w=3,v=4)
// i=3     0    0    3    4    5    7    8   (item3: w=4,v=5)

// For each cell dp[i][w]:

// If item fits (w[i-1] ≤ w):
//  Choose max between:
//    1. Not taking item: dp[i-1][w]
//    2. Taking item: dp[i-1][w-weights[i-1]] + values[i-1]
// If doesn't fit:
//  Keep previous value: dp[i-1][w]
// Final answer is dp[3][6] = 8

// Best combination: Take item1 (w=2,v=3) and item3 (w=4,v=5)

// dp[2][4] = 4 means:
// - Using first 2 items (weights[0] and weights[1])
// - With capacity 4
// - Best value possible is 4 (taking item1: w=2,v=3)

// dp[3][6] = 8 means:
// - Using all 3 items
// - With capacity 6
// - Best value possible is 8 (taking item1: w=2,v=3 and item3: w=4,v=5)
