// There is an m x n grid where you are allowed to move either down
// or to the right at any point in time.

// Given the two integers m and n, return the number
// of possible unique paths that can be taken from the top-left corner
// of the grid (grid[0][0]) to the bottom-right corner (grid[m - 1][n - 1]).

class Solution {
  /**
   * @param {number} m
   * @param {number} n
   * @return {number}
   */
  uniquePaths (m, n) {
    // Initialize the first row with 1s
    let row = new Array(n).fill(1)

    // Iterate over each row starting from the second row
    for (let i = 0; i < m - 1; i++) {
      // newRow represents the number of unique paths to reach each cell in the current row
      const newRow = new Array(n).fill(1)
      // Iterate over each cell in the current row from right to left
      for (let j = n - 2; j >= 0; j--) {
        // Recurrence relation: newRow[j] = newRow[j + 1] + row[j]
        newRow[j] = newRow[j + 1] + row[j]
      }
      // Update the row to the current row
      row = newRow
    }
    // Return the number of unique paths to reach the bottom-right corner
    return row[0]
  }
}
