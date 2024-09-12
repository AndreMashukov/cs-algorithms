// You are given two strings s and t, both consisting of English letters.
// Return the number of distinct subsequences of s which are equal to t.
// Example 1:
// Input: s = "caaat", t = "cat"
// Output: 3

class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {number}
   */
  numDistinct (s, t) {
    // Map to store the results of subproblems
    const dp = new Map()

    // Depth-First Search function to count distinct subsequences
    const dfs = (i, j) => {
      // If both strings are fully traversed, one valid subsequence is found
      if (i === s.length && j === t.length) {
        return 1
      }

      // If s is fully traversed but t is not, no valid subsequence is found
      if (i > s.length || j > t.length) {
        return 0
      }

      // Create a unique key for the current state
      const key = `${i} - ${j}`

      // If the result for the current state is already computed, return it
      if (dp.has(key)) {
        return dp.get(key)
      }

      let result
      // If characters match, we have two choices:
      // 1. Include the character in the subsequence
      // 2. Exclude the character from the subsequence
      if (s[i] === t[j]) {
        result = dfs(i + 1, j + 1) + dfs(i + 1, j)
      } else {
        // If characters do not match, move to the next character in s
        result = dfs(i + 1, j)
      }

      // Store the result in the map
      dp.set(key, result)
      return result
    };

    // Start the DFS from the beginning of both strings
    return dfs(0, 0)
  }
}

// Example usage
console.log(new Solution().numDistinct('rabbbit', 'rabbit')) // 3
