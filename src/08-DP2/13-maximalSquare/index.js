// 221. Maximal Square
// https://leetcode.com/problems/maximal-square/
// https://www.youtube.com/watch?v=6X7Ha2PrDmM 
// Given a rows x cols binary matrix filled with 0's and 1's,
// find the largest rectangle containing only 1's and return its area.

const maximalSquare = (matrix) => {
  const ROWS = matrix.length
  const COLS = matrix[0].length
  const map = new Map()

  const helper = (r, c) => {
    if (r >= ROWS || c >= COLS) return 0

    const key = `${r}-${c}`
    if (!map.has(key)) {
      const right = helper(r, c + 1)
      const down = helper(r + 1, c)
      const diagonal = helper(r + 1, c + 1)
      if (matrix[r][c] === '1') {
        map.set(key, Math.min(right, down, diagonal) + 1)
      } else {
        map.set(key, 0)
      }
    }

    return map.get(key)
  }

  helper(0, 0)
  return Math.max(...map.values()) ** 2
}
