// You are given a 
// 𝑚
// ×
// 𝑛
// m×n 2D grid initialized with these three possible values:

// -1 - A water cell that can not be traversed.
// 0 - A treasure chest.
// INF - A land cell that can be traversed. We use the integer 2^31 - 1 = 2147483647 to represent INF.

class Solution {
  /**
   * @param {number[][]} grid
   */
  islandsAndTreasure(grid) {
      let ROWS = grid.length; // Number of rows in the grid
      let COLS = grid[0].length; // Number of columns in the grid
      let visit = new Set(); // Set to keep track of visited cells
      let q = []; // Queue for BFS

      /**
       * Adds a cell to the queue if it is within bounds, not visited, and not water.
       * @param {number} r - Row index
       * @param {number} c - Column index
       */
      function addCell(r, c) {
          if (
              Math.min(r, c) < 0 || // Check if the cell is out of bounds
              r === ROWS || // Check if the row index is out of bounds
              c === COLS || // Check if the column index is out of bounds
              visit.has(r + ',' + c) || // Check if the cell is already visited
              grid[r][c] === -1 // Check if the cell is water
          ) {
              return;
          }
          visit.add(r + ',' + c); // Mark the cell as visited
          q.push([r, c]); // Add the cell to the queue
      }

      // Initialize the queue with all treasure cells
      for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
              if (grid[r][c] === 0) {
                  q.push([r, c]); // Add treasure cell to the queue
                  visit.add(r + ',' + c); // Mark treasure cell as visited
              }
          }
      }

      let dist = 0; // Distance from the nearest treasure
      while (q.length > 0) {
          for (let i = 0, len = q.length; i < len; i++) {
              let [r, c] = q.shift(); // Dequeue the next cell
              grid[r][c] = dist; // Update the cell with the distance
              addCell(r + 1, c); // Add the cell below
              addCell(r - 1, c); // Add the cell above
              addCell(r, c + 1); // Add the cell to the right
              addCell(r, c - 1); // Add the cell to the left
          }
          dist += 1; // Increment the distance for the next level of cells
      }
  }
}