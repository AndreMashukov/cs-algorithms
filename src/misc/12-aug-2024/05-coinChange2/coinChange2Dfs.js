class Solution {
  /**
   * @param {number} amount
   * @param {number[]} coins
   * @return {number}
   */
  change (amount, coins) {
    const cache = {}

    const dfs = (i, a) => {
      if (i === coins.length || a < 0) {
        return 0
      }

      if (a === 0) {
        return 1
      }
      const key = `${i} - ${a}`
      if (cache[key] !== undefined) {
        return cache[key]
      }

      cache[key] = dfs(i, a - coins[i]) + dfs(i + 1, a)

      return cache[key]
    }
    return dfs(0, amount)
  }
}

// the condition if (cache[key]) will fail when the cached value is 0
// because 0 is a falsy value in JavaScript.
// This can lead to incorrect results.
