// You are given a rectangular island heights where heights[r][c] represents the height
// above sea level of the cell at coordinate (r, c).

// The islands borders the Pacific Ocean from the top and left sides, 
// and borders the Atlantic Ocean from the bottom and right sides.

// Water can flow in four directions (up, down, left, or right) 
// from a cell to a neighboring cell with height equal or lower. 
// Water can also flow into the ocean from cells adjacent to the ocean.

// Find all cells where water can flow from that cell 
// to both the Pacific and Atlantic oceans. Return it as a 2D list 
// where each element is a list [r, c] representing the row and column of the cell. 
// You may return the answer in any order.

class Solution {
  /**
   * @param {number[][]} heights
   * @return {number[][]}
   */
  pacificAtlantic(heights) {
      const ROWS = heights.length,
          COLS = heights[0].length;
      const pac = new Set();
      const atl = new Set();

      for (let i = 0; i < ROWS; i++) {
          this.dfs(i, 0, pac, heights[i][0], ROWS, COLS, heights);
          this.dfs(
              i,
              COLS - 1,
              atl,
              heights[i][COLS - 1],
              ROWS,
              COLS,
              heights,
          );
      }

      for (let j = 0; j < COLS; j++) {
          this.dfs(0, j, pac, heights[0][j], ROWS, COLS, heights);
          this.dfs(
              ROWS - 1,
              j,
              atl,
              heights[ROWS - 1][j],
              ROWS,
              COLS,
              heights,
          );
      }

      const res = [];
      for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLS; j++) {
              const coord = i * COLS + j;
              if (pac.has(coord) && atl.has(coord)) {
                  res.push([i, j]);
              }
          }
      }
      return res;
  }

  /**
   * @param {number} r
   * @param {number} c
   * @param {Set} visit
   * @param {number} prevHeight
   * @param {number} ROWS
   * @param {number} COLS
   * @param {number[][]} heights
   * @return {void}
   */
  dfs(r, c, visit, prevHeight, ROWS, COLS, heights) {
      const coord = r * COLS + c;
      if (
          r < 0 ||
          c < 0 ||
          r === ROWS ||
          c === COLS ||
          heights[r][c] < prevHeight ||
          visit.has(coord)
      ) {
          return;
      }
      visit.add(coord);
      this.dfs(r + 1, c, visit, heights[r][c], ROWS, COLS, heights);
      this.dfs(r - 1, c, visit, heights[r][c], ROWS, COLS, heights);
      this.dfs(r, c + 1, visit, heights[r][c], ROWS, COLS, heights);
      this.dfs(r, c - 1, visit, heights[r][c], ROWS, COLS, heights);
  }
}
