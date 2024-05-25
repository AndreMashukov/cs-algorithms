// You are given an integer array coins representing coins
// of different denominations and an integer amount representing
// a total amount of money.

// Return the fewest number of coins that you need to make up that amount.
// If that amount of money cannot be made up by any combination of the coins,
// return -1.

// You may assume that you have an infinite number of each kind of coin.

// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

const coinChange = (coins, amount) => {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0

  // i is current amount
  for (let i = 1; i <= amount; i += 1) {
    for (let j = 0; j < coins.length; j += 1) {
      // if the current coin denomination coins[j]
      // is less than or equal to the current amount i
      if (coins[j] <= i) {
        // dp[i - coins[j]] + 1 represents the number of coins needed
        // to make up the amount i if we use one coin of denomination coins[j]
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
      }
    }
    // console.log(dp)
  }

  return dp[amount] === Infinity ? -1 : dp[amount]
};

console.log(coinChange([1, 2, 5], 11))

// [(0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3)];

// To make up the amount 1, the only choice is to use the coin of denomination 1. So, the minimum number of coins needed is 1.
// To make up the amount 2, there are two choices:
// Use two coins of denomination 1.
// Use one coin of denomination 2.
// The minimum number of coins needed is 1 (using one coin of denomination 2).
// To make up the amount 3, the best choice is to use one coin of denomination 1 and one coin of denomination 2. So, the minimum number of coins needed is 2.
// This process continues until the amount 11. To make up the amount 11, there are several choices, including:
// Use eleven coins of denomination 1.
// Use one coin of denomination 1 and five coins of denomination 2.
// Use one coin of denomination 1 and two coins of denomination 5.
// The minimum number of coins needed is 3 (using one coin of denomination 1 and two coins of denomination 5).

// i - coins[j] is the remaining amount after
// we use one coin of denomination coins[j].
// dp[i - coins[j]] is the minimum number of coins needed to make up that remaining amount.
// This value is available to us because we've already computed it
// in a previous iteration (this is the key idea behind dynamic programming).
// By adding 1 to dp[i - coins[j]], we're accounting for the coin of denomination coins[j]
// that we're choosing to use.
// So, dp[i - coins[j]] + 1 gives us a potential new minimum number
// of coins that can be used to make up the amount i. If this value is less
// than the current value of dp[i], we update dp[i] with this new value.

// For i = 1 and coins[j] = 1:

// i - coins[j] is 1 - 1, which is 0.
// dp[i - coins[j]] is dp[0], which is 0 (since we initialized dp[0] to 0).
// So, dp[i - coins[j]] + 1 is 0 + 1, which is 1.
//  This means that we can make up the amount 1 using 1 coin of denomination 1.
