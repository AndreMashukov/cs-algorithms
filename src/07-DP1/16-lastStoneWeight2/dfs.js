// 1049. Last Stone Weight II
// https://leetcode.com/problems/last-stone-weight-ii/

// You are given an array of integers stones
// where stones[i] is the weight of the ith stone.
// We are playing a game with the stones.
// On each turn, we choose any two stones and smash them together.
// Suppose the stones have weights x and y with x <= y.
//  The result of this smash is:

// If x == y, both stones are destroyed, and
// If x != y, the stone of weight x is destroyed,
// and the stone of weight y has new weight y - x.
// At the end of the game, there is at most one stone left.

// Return the smallest possible weight of the left stone. If there are no stones left, return 0.

// Example 1:

// Input: stones = [2,7,4,1,8,1]
// Output: 1
// Explanation:
// We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
// we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
// we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
// we can combine 1 and 1 to get 0, so the array converts to [1],
// then that's the optimal value.

/**
 * @param {number[]} stones
 * @return {number}
 */
const lastStoneWeightIIDfs = function (stones) {
  // Initialize the memoization cache
  const memo = new Map()

  /**
   * DFS helper function to explore all possible stone combinations
   * @param {number} index - Current stone index being considered
   * @param {number} total - Current total weight of stones
   * @return {number} Smallest possible weight of the left stone
   */
  const dfs = (index, total) => {
    // Base case: No more stones left
    if (index === stones.length) {
      return total
    }

    // Check memoized result
    if (memo.has(`${index}-${total}`)) {
      return memo.get(`${index}-${total}`)
    }

    // Option 1: Smash the stone
    const smash1 = dfs(index + 1, Math.abs(total - stones[index]))

    // Option 2: Keep the stone
    const smash2 = dfs(index + 1, total + stones[index])

    // Take the smallest option
    const minWeight = Math.min(smash1, smash2)
    memo.set(`${index}-${total}`, minWeight)
    return minWeight
  }

  // Start DFS from the first stone with total weight 0
  return dfs(0, 0)
}
