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
    const wordSet = new Set(wordDict)
    // keep track of the start indices that have been visited
    const visited = new Set()
    const stack = [0]

    while (stack.length) {
      const start = stack.pop()

      // decisions are based on the words from wordDict
      if (!visited.has(start)) {
        for (let end = start + 1; end <= s.length; end++) {
          if (wordSet.has(s.slice(start, end))) {
            if (end === s.length) {
              return true
            }
            stack.push(end)
          }
        }
        visited.add(start)
      }
    }

    return false
  }
}

console.log(
  new Solution().wordBreak('applepenapple', ['apple', 'pen', 'ape']) // true
)
