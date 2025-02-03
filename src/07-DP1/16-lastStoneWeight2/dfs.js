// 1049. Last Stone Weight II
// https://leetcode.com/problems/last-stone-weight-ii/
// https://www.youtube.com/watch?v=gdXkkmzvR3c

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
  const map = new Map()
  const stoneSum = stones.reduce((acc, stone) => acc + stone, 0)
  const target = stoneSum / 2

  const dfs = (i, total) => {
    // Base case: If we have reached the end of the stones array
    if (i === stones.length) {
      // If the total weight is less than or equal to the target weight,
      // return the remaining weight (which is the weight of the last stone)
      // Otherwise, return the total weight (which is the weight of the last stone)
      return total <= target ? total : total - target
    }

    // Check if the current state has been memoized
    const key = `${i}-${total}`
    if (map.has(key)) {
      return map.get(key)
    }

    // Recursive cases:
    // 1. Skip the current stone
    const skip = dfs(i + 1, total)
    // 2. Use the current stone
    const use = dfs(i + 1, total + stones[i])

    // Memoize the minimum weight of the remaining stones
    const res = Math.min(skip, use)
    map.set(key, res)

    return res
  }

  return dfs(0, 0)
}
