class Solution {
  /**
   * @param {number[][]} matrix
   * @return {number}
   */
  longestIncreasingPath (matrix) {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ]
    const ROWS = matrix.length
    const COLS = matrix[0].length
    const dp = Array.from({ length: ROWS }, () => Array(COLS).fill(-1))

    const dfs = (r, c, prevVal) => {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || matrix[r][c] <= prevVal) {
        return 0
      }
      if (dp[r][c] !== -1) return dp[r][c]

      let res = 1
      for (const d of directions) {
        res = Math.max(res, 1 + dfs(r + d[0], c + d[1], matrix[r][c]))
      }
      dp[r][c] = res
      return res
    }

    let LIP = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        LIP = Math.max(LIP, dfs(r, c, -Infinity))
      }
    }
    return LIP
  }
}
