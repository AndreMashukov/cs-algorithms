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
    const words = new Set(wordDict)
    const visited = new Set()
    const stack = [0]

    while (stack.length) {
      const start = stack.pop()

      for (let end = start + 1; end < s.length + 1; end++) {
        if (words.has(s.slice(start, end))) {
          if (end === s.length) return true
          // If the end index is not the last character in the string,
          if (!visited.has(end)) {
            stack.push(end)
            visited.add(end)
          }
        }
      }
    }
    return false
  }
}

console.log(
  new Solution().wordBreak('applepenapple', ['apple', 'pen', 'ape']) // true
)
