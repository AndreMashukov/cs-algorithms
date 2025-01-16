class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {number}
   */
  numDistinct (s, t) {
    // Initialize a 2D array (cache) with dimensions (s.length + 1) x (t.length + 1)
    const cache = new Array(s.length + 1)
      .fill(0)
      .map(() => new Array(t.length + 1).fill(0))

    // Fill the last column with 1s because an empty t can be formed by any substring of s
    for (let i = 0; i <= s.length; i++) {
      cache[i][t.length] = 1
    }

    // Iterate over the strings in reverse order to fill the cache
    for (let i = s.length - 1; i >= 0; i--) {
      for (let j = t.length - 1; j >= 0; j--) {
        // If characters match, add the results of the two subproblems
        if (s[i] === t[j]) {
          cache[i][j] = cache[i + 1][j + 1] + cache[i + 1][j]
        } else {
          // If characters don't match, carry forward the result from the next character in s
          cache[i][j] = cache[i + 1][j]
        }
      }
    }
    // The result is stored in cache[0][0]
    return cache[0][0]
  }
}

console.log(new Solution().numDistinct('rabbbit', 'rabbit')) // 3

// const initialCache = [
//      r  a  b  b  i  t
//   r [0, 0, 0, 0, 0, 0, 1],
//   a [0, 0, 0, 0, 0, 0, 1],
//   b [0, 0, 0, 0, 0, 0, 1],
//   b [0, 0, 0, 0, 0, 0, 1],
//   b [0, 0, 0, 0, 0, 0, 1],
//   i [0, 0, 0, 0, 0, 0, 1],
//   t [0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 1]
// ]

// const finalCache = [
//      r  a  b  b  i  t
//   r [3, 2, 1, 1, 1, 1, 1],
//   a [0, 2, 1, 1, 1, 1, 1],
//   b [0, 0, 1, 1, 1, 1, 1],
//   b [0, 0, 0, 1, 1, 1, 1],
//   b [0, 0, 0, 0, 1, 1, 1],
//   i [0, 0, 0, 0, 0, 1, 1],
//   t [0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 1]
// ]
