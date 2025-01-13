// Given a string s and a dictionary of strings wordDict,
// return true if s can be segmented
// into a space-separated sequence of dictionary words.

// You are allowed to reuse words in the dictionary an unlimited number of times.
// You may assume all dictionary words are unique.

// Example:
// Input: s = "applepenapple", wordDict = ["apple","pen","ape"]
// Output: true
// The function doesn't require that all words in wordDict be used,
// but it does require that all characters in s be used.

class Solution {
  /**
   * @param {string} s
   * @param {string[]} wordDict
   * @return {boolean}
   */
  wordBreak (s, wordDict) {
    // Memoization map to store results of subproblems
    const map = new Map()

    // Depth-First Search function to check if s[i:] can be segmented
    const dfs = (i) => {
      // If we have reached the end of the string, return true
      if (i === s.length) {
        return true
      }

      // If the result is already computed, return it
      if (map.has(i)) {
        return map.get(i)
      }

      // Iterate over each word in the dictionary
      for (const word of wordDict) {
        // Check if the current substring starts with the word
        if (s.startsWith(word, i)) {
          // Recursively check the remaining substring
          if (dfs(i + word.length)) {
            map.set(i, true)
            return true
          }
        }
      }

      // If no valid segmentation is found, store and return false
      map.set(i, false)
      return false
    }

    // Start the DFS from the beginning of the string
    return dfs(0)
  }
}

// Test case
console.log(
  new Solution().wordBreak('applepenapple', ['apple', 'pen', 'ape']) // true
)
