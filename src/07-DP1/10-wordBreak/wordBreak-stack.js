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
    // Convert the word dictionary to a set for faster lookups
    const words = new Set(wordDict)
    // Set to keep track of visited indices to avoid reprocessing
    const visited = new Set()
    // Stack to perform depth-first search
    const stack = [0]

    // Perform DFS using the stack
    while (stack.length) {
      // Get the current starting index
      const start = stack.pop()

      // Iterate over possible end indices
      for (let end = start + 1; end < s.length + 1; end++) {
        // Check if the substring from start to end is in the dictionary
        if (words.has(s.slice(start, end))) {
          // If the end index is the length of the string, return true
          if (end === s.length) return true
          // If the end index is not the last character in the string,
          // and it has not been visited yet, add it to the stack
          if (!visited.has(end)) {
            stack.push(end)
            visited.add(end)
          }
        }
      }
    }
    // If no valid segmentation is found, return false
    return false
  }
}

// Test case
console.log(
  new Solution().wordBreak('applepenapple', ['apple', 'pen', 'ape']) // true
)
