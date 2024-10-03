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
  pacificAtlantic (heights) {
    const ROWS = heights.length
    const COLS = heights[0].length
    const pac = new Set() // Set to track cells that can flow to the Pacific Ocean
    const atl = new Set() // Set to track cells that can flow to the Atlantic Ocean

    // Closure function for DFS
    const dfs = (r, c, visit, prevHeight) => {
      const coord = r * COLS + c
      // Base case: if the cell is out of bounds, lower in height, or already visited, return
      if (
        r < 0 ||
          c < 0 ||
          r === ROWS ||
          c === COLS ||
          heights[r][c] < prevHeight ||
          visit.has(coord)
      ) {
        return
      }
      // Mark the cell as visited
      visit.add(coord)
      // Recursively visit all four directions
      dfs(r + 1, c, visit, heights[r][c]) // Down
      dfs(r - 1, c, visit, heights[r][c]) // Up
      dfs(r, c + 1, visit, heights[r][c]) // Right
      dfs(r, c - 1, visit, heights[r][c]) // Left
    }

    // Perform DFS from all cells adjacent to the Pacific Ocean
    for (let i = 0; i < ROWS; i++) {
      dfs(i, 0, pac, heights[i][0]) // Left border (Pacific)
      dfs(i, COLS - 1, atl, heights[i][COLS - 1]) // Right border (Atlantic)
    }

    // Perform DFS from all cells adjacent to the Atlantic Ocean
    for (let j = 0; j < COLS; j++) {
      dfs(0, j, pac, heights[0][j]) // Top border (Pacific)
      dfs(ROWS - 1, j, atl, heights[ROWS - 1][j]) // Bottom border (Atlantic)
    }

    const res = []
    // Check all cells to see if they can flow to both oceans
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const coord = i * COLS + j
        if (pac.has(coord) && atl.has(coord)) {
          res.push([i, j])
        }
      }
    }
    return res
  }
}
