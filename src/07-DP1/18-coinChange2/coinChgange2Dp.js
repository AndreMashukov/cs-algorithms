class Solution {
  /**
   * @param {number} amount - The total amount of money
   * @param {number[]} coins - The denominations of the coins
   * @return {number} - The number of ways to make up that amount
   */
  change (amount, coins) {
    // Initialize a dp array where dp[i] represents the number of ways to make amount i
    let dp = new Array(amount + 1).fill(0)
    dp[0] = 1 // There is one way to make amount 0, which is to use no coins

    // Iterate over each coin starting from the last one
    for (let i = coins.length - 1; i >= 0; i--) {
      // Create a new dp array for the next iteration
      const nextDP = new Array(amount + 1).fill(0)
      nextDP[0] = 1 // There is one way to make amount 0, which is to use no coins

      // Iterate over each amount from 1 to the target amount
      for (let a = 1; a <= amount; a++) {
        // Start by assuming the number of ways to make amount a is the same as the previous dp array
        nextDP[a] = dp[a]

        // If the current amount minus the coin value is non-negative,
        // add the number of ways to make the remaining amount (a - coins[i])
        if (a - coins[i] >= 0) {
          nextDP[a] += nextDP[a - coins[i]]
        }
      }

      // Update dp to be the nextDP for the next iteration
      dp = nextDP
    }

    // Return the number of ways to make the target amount
    return dp[amount]
  }
}

// Example usage
console.log(new Solution().change(5, [1, 2, 5])) // 4
// Explanation: There are four ways to make up the amount:
// 5 = 5
// 5 = 2 + 2 + 1
// 5 = 2 + 1 + 1 + 1
// 5 = 1 + 1 + 1 + 1 + 1

// Let's take a simple example to illustrate how the dp array evolves.
// Suppose we have coins = [1, 2] and amount = 4.
// dp = [1, 0, 0, 0, 0]
// First iteration with coin = 2:
// dp = [1, 0, 1, 0, 1]
// Second iteration with coin = 1:
// dp = [1, 1, 2, 2, 3]
// The final answer is dp[4] = 3.
