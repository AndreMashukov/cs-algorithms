class Solution {
  /**
   * @param {number[][]} grid
   * @return {number}
   */
  maxAreaOfIsland (grid) {
    const ROWS = grid.length
    const COLS = grid[0].length
    const visit = new Set()

    /**
     * @param {number} r
     * @param {number} c
     * @return {number}
     */
    function dfs (r, c) {
      if (
        r < 0 ||
        r === ROWS ||
        c < 0 ||
        c === COLS ||
        grid[r][c] === 0 ||
        visit.has(`${r},${c}`)
      ) {
        return 0
      }
      visit.add(`${r},${c}`)
      return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
    }

    let area = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        area = Math.max(area, dfs(r, c))
      }
    }
    return area
  }
}
