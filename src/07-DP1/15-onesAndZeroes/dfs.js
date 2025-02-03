// 474. Ones and Zeroes
// https://leetcode.com/problems/ones-and-zeroes/description/
// You are given an array of binary strings strs
// and two integers m and n.

// Return the size of the largest subset of strs
// such that there are at most m 0's and n 1's in the subset.

// A set x is a subset of a set y if all elements of x
// are also elements of y.

// Example 1:

// Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
// Output: 4
// Explanation: The largest subset with at most 5 0's and 3 1's
// is {"10", "0001", "1", "0"}, so the answer is 4.
// Other valid but smaller subsets include
// {"0001", "1"} and {"10", "1", "0"}.
// {"111001"} is an invalid subset because it contains 4 1's,
// greater than the maximum of 3.

const countZerosOnes = (str) => {
  let zeros = 0
  let ones = 0

  for (const char of str) {
    if (char === '0') {
      zeros++
    } else {
      ones++
    }
  }

  return [zeros, ones]
}

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const findMaxFormDfs = function (strs, m, n) {
  // Input validation - ensure array exists and m/n are non-negative
  if (!strs?.length || m < 0 || n < 0) {
    return 0
  }

  // Memoization cache to avoid recalculating same subproblems
  // Key format: 'index,mRemaining,nRemaining' -> Value: max subset size
  const map = new Map()

  /**
   * DFS helper function to explore string combinations
   * @param {number} i - Current string index being considered
   * @param {number} mRem - Remaining 0's allowed
   * @param {number} nRem - Remaining 1's allowed
   * @return {number} Maximum subset size achievable from this state
   */
  const dfs = (i, mRem, nRem) => {
    // Base case: Processed all strings
    if (i === strs.length) {
      return 0
    }

    // Check if this subproblem was already solved
    const key = `${i},${mRem},${nRem}`
    if (map.has(key)) {
      return map.get(key)
    }

    // Count 0's and 1's in current string
    const [zeros, ones] = countZerosOnes(strs[i])

    // If current string is too large, skip it
    if (zeros > mRem || ones > nRem) {
      const result = dfs(i + 1, mRem, nRem)
      map.set(key, result)
      return result
    }

    // Try two options for current string:
    // 1. Include: Add its size and recurse with reduced 0's and 1's
    // 2. Exclude: Skip it and keep same 0's and 1's
    const includeString = 1 + dfs(
      i + 1,
      mRem - zeros,
      nRem - ones
    )
    const excludeString = dfs(i + 1, mRem, nRem)

    // Store and return the better of the two choices
    const result = Math.max(includeString, excludeString)
    map.set(key, result)
    return result
  }

  return dfs(0, m, n)
}
