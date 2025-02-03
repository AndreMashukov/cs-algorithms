// https://neetcode.io/problems/zeroOneKnapsack

/**
 * 0/1 Knapsack Problem Solution using DFS with memoization
 * Given weights and values of n items, put these items in a knapsack of capacity W
 * to get the maximum total value in the knapsack.
 * Each item can only be used once (0/1 property).
 */

/**
 * @param {number[]} weights - Array of item weights
 * @param {number[]} values - Array of item values
 * @param {number} capacity - Maximum weight capacity of knapsack
 * @return {number} Maximum value possible within weight constraint
 */
const knapsackDfs = (weights, values, capacity) => {
  // Input validation - ensure arrays exist and capacity is non-negative
  if (!weights?.length || !values?.length || capacity < 0) {
    return 0
  }

  // Memoization cache to avoid recalculating same subproblems
  // Key format: 'index,remainingCapacity' -> Value: max value possible
  const map = new Map()

  /**
   * DFS helper function to explore item combinations
   * @param {number} index - Current item index being considered
   * @param {number} remainingCapacity - Remaining weight capacity
   * @return {number} Maximum value achievable from this state
   */
  const dfs = (index, remainingCapacity) => {
    // Base cases:
    // 1. Processed all items
    // 2. No capacity left
    if (index === weights.length || remainingCapacity <= 0) {
      return 0
    }

    // Check if this subproblem was already solved
    const key = `${index},${remainingCapacity}`
    if (map.has(key)) {
      return map.get(key)
    }

    // If current item is too heavy, skip it
    if (weights[index] > remainingCapacity) {
      const result = dfs(index + 1, remainingCapacity)
      map.set(key, result)
      return result
    }

    // Try two options for current item:
    // 1. Include: Add its value and recurse with reduced capacity
    // 2. Exclude: Skip it and keep same capacity
    const includeItem =
      values[index] + dfs(index + 1, remainingCapacity - weights[index])
    const excludeItem = dfs(index + 1, remainingCapacity)

    // Store and return the better of the two choices
    const result = Math.max(includeItem, excludeItem)
    map.set(key, result)
    return result
  }

  // Start DFS from first item with full capacity
  return dfs(0, capacity)
}
