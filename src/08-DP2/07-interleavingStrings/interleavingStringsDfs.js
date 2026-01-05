// 97. Interleaving String
// https://leetcode.com/problems/interleaving-string/description/
// You are given three strings s1, s2, and s3.
// Return true if s3 is formed by interleaving s1 and s2 together or false otherwise.

// Input: s1 = "aaaa", s2 = "bbbb", s3 = "aabbbbaa"
// Output: true

const isInterleaveDfs = (s1, s2, s3) => {
  // Create a memoization map to store the results of subproblems
  const dp = new Map()

  // Define a helper function for depth-first search
  // i is the index of s1, j is the index of s2
  const dfs = (i, j) => {
    // Calculate k from i and j
    const k = i + j

    // Base case: if all indices have reached the end of their respective strings
    if (i === s1.length && j === s2.length && k === s3.length) {
      return true
    }

    // Create a unique key for the current state
    const key = `${i}-${j}`
    // If the result for this state is already computed, return it
    if (dp.has(key)) {
      return dp.get(key)
    }

    let result = false
    // Check if the current character of s1 matches
    // the current character of s3.
    if (i < s1.length && s1[i] === s3[k]) {
      // Recursively check the next state
      result = dfs(i + 1, j)
    }

    // If the result is still false, check if the current character
    // of s2 matches the current character of s3.
    if (!result && j < s2.length && s2[j] === s3[k]) {
      // Recursively check the next state
      result = dfs(i, j + 1)
    }

    // Store the result in the memoization map
    dp.set(key, result)
    return result
  }

  // Start the depth-first search from the beginning of all strings
  return dfs(0, 0)
}

// Example usage
console.log(isInterleaveDfs('aaaa', 'bbbb', 'aabbbbaa')) // true
