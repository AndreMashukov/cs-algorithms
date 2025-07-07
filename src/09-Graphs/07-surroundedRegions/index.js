// You are given a 2-D matrix board containing 'X' and 'O' characters.
// If a continuous, four-directionally connected group of 'O's is surrounded by 'X's,
// it is considered to be surrounded.
// Change all surrounded regions of 'O's to 'X's and do
// so in-place by modifying the input board.

class Solution {
  /**
   * @param {character[][]} board
   * @return {void} Do not return anything, modify board in-place instead.
   */
  solve (board) {
    const ROWS = board.length
    if (ROWS === 0) return
    const COLS = board[0].length

    // Closure function for DFS to capture unsurrounded regions
    const capture = (board, r, c) => {
      // Base case: if the cell is out of bounds, not 'O', or already visited, return
      if (r < 0 || c < 0 || r === ROWS || c === COLS || board[r][c] !== 'O') {
        return
      }
      // Mark the cell as visited by setting it to 'T'
      board[r][c] = 'T'
      // Recursively visit all four directions
      capture(board, r + 1, c) // Down
      capture(board, r - 1, c) // Up
      capture(board, r, c + 1) // Right
      capture(board, r, c - 1) // Left
    }

    // Capture unsurrounded regions (connected to borders)
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // If the cell is 'O' and on the border, start DFS to capture the region
        if (
          board[r][c] === 'O' &&
          (r === 0 || c === 0 || r === ROWS - 1 || c === COLS - 1)
        ) {
          capture(board, r, c)
        }
      }
    }

    // Flip all remaining 'O' to 'X'
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] === 'O') {
          board[r][c] = 'X'
        }
      }
    }

    // Flip all 'T' back to 'O'
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] === 'T') {
          board[r][c] = 'O'
        }
      }
    }
  }
}

// Steps:
// Mark Border-Connected 'O': Use DFS to mark 'O' regions connected
// to the borders with 'T'.
// Flip Remaining 'O' to 'X': Convert all 'O' not marked as 'T' to 'X'.
// Restore 'T' to 'O': Convert all 'T' back to 'O'.
