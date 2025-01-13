// You are given the weights and values of items,
// and you need to put these items in a knapsack of capacity capacity
// to achieve the maximum total value in the knapsack.
// \Each item is available in only one quantity.

const knapsackDfs = (weights, values, capacity) => {
  // Input validation
  if (!weights?.length || !values?.length || capacity < 0) {
    return 0
  }

  // Memoization cache: key = 'index,remainingCapacity'
  const memo = new Map()

  const dfs = (index, remainingCapacity) => {
    // Base cases
    if (index === weights.length || remainingCapacity <= 0) {
      return 0
    }

    // Check memo
    const key = `${index},${remainingCapacity}`
    if (memo.has(key)) {
      return memo.get(key)
    }

    // Skip current item if it exceeds capacity
    if (weights[index] > remainingCapacity) {
      const result = dfs(index + 1, remainingCapacity)
      memo.set(key, result)
      return result
    }

    // Try both including and excluding current item
    const includeItem =
      values[index] + dfs(index + 1, remainingCapacity - weights[index])
    const excludeItem = dfs(index + 1, remainingCapacity)

    const result = Math.max(includeItem, excludeItem)
    memo.set(key, result)
    return result
  }

  return dfs(0, capacity)
}
