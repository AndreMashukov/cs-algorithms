// LeetCode 417 - Pacific Atlantic Water Flow
// https://leetcode.com/problems/pacific-atlantic-water-flow/description/
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

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const ROWS = heights.length;
  const COLS = heights[0].length;
  const pac = new Set();
  const atl = new Set();

  const dfs = (r, c, prevHeight, visited) => {
    const coord = `${r},${c}`;

    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || visited.has(coord) || heights[r][c] < prevHeight) return

    visited.add(coord);

    dfs(r + 1, c, heights[r][c], visited)
    dfs(r - 1, c, heights[r][c], visited)
    dfs(r, c + 1, heights[r][c], visited)
    dfs(r, c - 1, heights[r][c], visited)
  }

  for (let i = 0; i < ROWS; i++) {
    dfs(i, 0, heights[i][0], pac)
    dfs(i, COLS - 1, heights[i][COLS - 1], atl)
  }

  for (let j = 0; j < COLS; j++) {
    dfs(0, j, heights[0][j], pac)
    dfs(ROWS - 1, j, heights[ROWS - 1][j], atl)
  }

  let res = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const coord = `${r},${c}`
      if (pac.has(coord) && atl.has(coord)) {
        res.push([r, c])
      }
    }
  }

  return res 
};