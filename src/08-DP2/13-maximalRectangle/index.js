// 85. Maximal Rectangle
// Given a rows x cols binary matrix filled with 0's and 1's,
// find the largest rectangle containing only 1's and return its area.

// IT'S NOT WORKING
const maximalRectangle = (matrix) => {
  const ROWS = matrix.length
  const COLS = matrix[0].length
  const map = new Map()

  const helper = (r, c) => {
    if (r >= ROWS || c >= COLS) return 0

    const key = `${r}-${c}`
    if (!map.has(key)) {
      const right = helper(r, c d + 1)
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
