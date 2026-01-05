// 518. Coin Change 2
// https://leetcode.com/problems/coin-change-2/description/
// You are given an integer array coins representing coins of different denominations
// (e.g. 1 dollar, 5 dollars, etc) and an integer amount representing
// a target amount of money.

// Return the number of distinct combinations that total up to amount.
// If it's impossible to make up the amount, return 0.

// You may assume that you have an unlimited number of each coin
// and that each value in coins is unique.

class Solution {
  /**
   * @param {number} amount
   * @param {number[]} coins
   * @return {number}
   */
  change (amount, coins) {
    const cache = {}

    const dfs = (i, rem) => {
      if (i === coins.length || rem < 0) {
        return 0
      }

      if (rem === 0) {
        return 1
      }
      const key = `${i} - ${rem}`
      if (cache[key] !== undefined) {
        return cache[key]
      }

      cache[key] = dfs(i, rem - coins[i]) + dfs(i + 1, rem)

      return cache[key]
    }
    return dfs(0, amount)
  }
}

// the condition if (cache[key]) will fail when the cached value is 0
// because 0 is a falsy value in JavaScript.
// This can lead to incorrect results.
