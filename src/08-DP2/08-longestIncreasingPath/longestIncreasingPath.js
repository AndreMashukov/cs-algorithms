// You are given a 2-D grid of integers matrix, where each integer
// is greater than or equal to 0.
// Return the length of the longest strictly increasing path within matrix.
// From each cell within the path, you can move either horizontally or vertically.
// You may not move diagonally.

class Solution {
  /**
   * @param {number[][]} matrix
   * @return {number}
   */
  longestIncreasingPath (matrix) {
    const ROWS = matrix.length
    const COLS = matrix[0].length

    const dp = new Map()

    const dfs = (r, c, prev) => {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || matrix[r][c] <= prev) {
        return 0
      }

      const key = `${r} - ${c}`
      if (dp.has(key)) {
        return dp.get(key)
      }

      let res = 1
      res = Math.max(res, 1 + dfs(r + 1, c, matrix[r][c]))
      res = Math.max(res, 1 + dfs(r - 1, c, matrix[r][c]))
      res = Math.max(res, 1 + dfs(r, c + 1, matrix[r][c]))
      res = Math.max(res, 1 + dfs(r, c - 1, matrix[r][c]))

      dp.set(key, res)

      return res
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dfs(r, c, -1)
      }
    }

    // console.log(Array.from(dp).map(e => e[1]))
    return Math.max(...Array.from(dp).map((e) => e[1]))
  }
}

console.log(
  new Solution().longestIncreasingPath([
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1]
  ])
) // 4

// When making recursive calls to explore the neighboring cells,
// the current cell's value matrix[r][c] is passed as the new prev value.
// This ensures that the next cell in the path must have a value greater
// than the current cell's value.
