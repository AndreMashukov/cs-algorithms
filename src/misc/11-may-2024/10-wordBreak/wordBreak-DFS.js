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
    const map = {}
    const dfs = (i) => {
      if (i === s.length) {
        return true
      }

      if (map[i] !== undefined) {
        return map[i]
      }

      for (const word of wordDict) {
        if (s.startsWith(word, i)) {
          if (dfs(i + word.length)) {
            return (map[i] = true)
          }
        }
      }

      return (map[i] = false)
    };

    return dfs(0)
  }
}

console.log(
  new Solution().wordBreak('applepenapple', ['apple', 'pen', 'ape']) // true
)
