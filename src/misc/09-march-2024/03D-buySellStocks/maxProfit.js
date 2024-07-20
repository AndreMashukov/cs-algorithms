// Buy and Sell Stocks
// Return the maximum profit you can achieve.
// You may choose to not make any transactions,
// in which case the profit would be 0.

// Example 1:
// Input: prices = [10,1,5,6,7,1]
// Output: 6

const maxProfit = (prices) => {
  let left = 0
  let right = 1
  let maxProfit = 0

  while (right < prices.length) {
    if (prices[right] > prices[left]) {
      maxProfit = Math.max(maxProfit, prices[right] - prices[left])
    } else {
      left = right
    }
    right++
  }
}
