// https://www.youtube.com/watch?v=9ni-aDIekV8

/**
 * Finds minimum number of coins needed to make up given amount using BFS approach
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount) for queue and seen set
 */
class Solution {
  /**
   * @param {number[]} coins - Array of coin denominations
   * @param {number} amount - Target amount to make
   * @return {number} Minimum number of coins needed, -1 if impossible
   */
  coinChange (coins, amount) {
    // Base case - no coins needed for amount 0
    if (amount === 0) return 0

    // Start BFS from 0, tracking [currentSum, coinsUsed]
    const queue = [[0, 0]]
    const seen = new Set() // Track visited sums to avoid cycles
    seen.add(0)

    // Process queue until empty
    while (queue.length > 0) {
      // level is the number of coins used so far
      const [currentSum, level] = queue.shift()

      // Try adding each coin to current sum
      for (const coin of coins) {
        const nextSum = currentSum + coin

        // Found exact amount - return coins used
        if (nextSum === amount) {
          return level + 1
        }

        // If sum is valid and unseen, add to queue
        if (nextSum < amount && !seen.has(nextSum)) {
          queue.push([nextSum, level + 1])
          seen.add(nextSum)
        }
      }
    }

    // No valid combination found
    return -1
  }
}
// coins=[1,2,5]
// amount=11

// [ [ 0, 0 ] ]
// [ [ 1, 1 ], [ 2, 1 ], [ 5, 1 ] ]
// [ [ 2, 1 ], [ 5, 1 ], [ 3, 2 ], [ 6, 2 ] ]
// [ [ 5, 1 ], [ 3, 2 ], [ 6, 2 ], [ 4, 2 ], [ 7, 2 ] ]
// [ [ 3, 2 ], [ 6, 2 ], [ 4, 2 ], [ 7, 2 ], [ 10, 2 ] ]
// [ [ 6, 2 ], [ 4, 2 ], [ 7, 2 ], [ 10, 2 ], [ 8, 3 ] ]
