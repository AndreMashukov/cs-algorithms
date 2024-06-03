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
