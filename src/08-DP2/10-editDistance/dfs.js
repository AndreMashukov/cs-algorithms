/**
 * Edit Distance Problem Solution using Dynamic Programming (Top-Down Approach)
 * Calculates minimum number of operations to convert word1 to word2
 * Operations allowed: insert, delete, replace
 */
class Solution {
  /**
   * @param {string} word1 - First input string
   * @param {string} word2 - Second input string
   * @return {number} - Minimum number of operations needed
   */
  minDistance (word1, word2) {
    const m = word1.length
    const n = word2.length
    // Create memoization Map
    const dp = new Map()

    const dfs = (i, j) => {
      // Base cases: if either string is exhausted,
      // return remaining length of other string
      if (i === m) return n - j // Insert remaining chars from word2
      if (j === n) return m - i // Delete remaining chars from word1

      const key = `${i},${j}`
      // Return cached result if available
      if (dp.has(key)) return dp.get(key)

      // If characters match, no operation needed
      if (word1[i] === word2[j]) {
        dp.set(key, dfs(i + 1, j + 1))
      } else {
        // Try all operations and take minimum:
        // 1. Delete char from word1 (i+1, j)
        // 2. Insert char into word1 (i, j+1)
        // 3. Replace char in word1 (i+1, j+1)
        let res = Math.min(dfs(i + 1, j), dfs(i, j + 1))
        res = Math.min(res, dfs(i + 1, j + 1))
        dp.set(key, res + 1) // Add 1 for the operation performed
      }
      return dp.get(key)
    }

    return dfs(0, 0)
  }


// For "monkeys" and "money", let's trace what should happen:
// At position (0,0): Both strings start with "mon", so we move to (3,3) without any operations
// At (3,3): We have "keys" vs "ey"
// We need to delete 'k' and 's' to transform "keys" to "ey"
// Therefore, the final answer should be 2