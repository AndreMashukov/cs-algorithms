// 188. Best Time to Buy and Sell Stock IV
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/
// // We need to find the maximum profit
// that can be achieved with at most k transactions
// on a given list of stock prices.
// A transaction consists of buying and
// then selling one share of the stock.

// Input: prices = [3, 2, 6, 5, 0, 3], k = 2
// Output: 7
// Explanation:
// Buy on day 2 (price = 2) and sell on day 3 (price = 6),
// profit = 6-2 = 4.
// Then buy on day 5 (price = 0) and sell on day 6 (price = 3),
// profit = 3-0 = 3.

const maxProfit = (prices, k) => {
  const n = prices.length
  const dp = new Map()

  const dfs = (day, tRem, hold) => {
    if (tRem === 0 || day === n) return 0
    const key = `${day}-${tRem}-${hold}`
    if (dp.has(key)) return dp.get(key)

    const doNothing = dfs(day + 1, tRem, hold)
    let doSomething

    if (hold) {
      // Sell the stock
      doSomething = prices[day] + dfs(day + 1, tRem - 1, 0)
    } else {
      // Buy the stock
      doSomething = -prices[day] + dfs(day + 1, tRem, 1)
    }

    const result = Math.max(doNothing, doSomething)
    dp.set(key, result)
    return result
  }

  return dfs(0, k, 0)
}

console.log(maxProfit([3, 2, 6, 5, 0, 3], 2)) // Should be 7
console.log(maxProfit([1, 2, 3, 4, 5], 1)) // Should be 4
