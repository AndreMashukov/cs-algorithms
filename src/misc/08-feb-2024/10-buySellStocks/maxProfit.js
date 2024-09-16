// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
// Buy and Sell Stocks
// Return the maximum profit you can achieve.
// You may choose to not make any transactions,
// in which case the profit would be 0.

// Example 1:
// Input: prices = [10,1,5,6,7,1]
// Output: 6

const maxProfit = (prices) => {
  // Initialize two pointers: left (buy day) and right (sell day)
  let left = 0
  let right = 1
  // Initialize maxProfit to keep track of the maximum profit found
  let maxProfit = 0

  // Iterate through the prices array with the right pointer
  while (right < prices.length) {
    // If the price at right is greater than the price at left, calculate profit
    if (prices[right] > prices[left]) {
      // Update maxProfit if the current profit is greater than the previous maxProfit
      maxProfit = Math.max(maxProfit, prices[right] - prices[left])
    } else {
      // If the price at right is less than or equal to the price at left, move the left pointer to right
      left = right
    }
    // Move the right pointer to the next day
    right++
  }

  // Return the maximum profit found
  return maxProfit
}
