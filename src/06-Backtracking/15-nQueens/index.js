// The n-queens puzzle is the problem of placing n queens on an n x n chessboard
// so that no two queens can attack each other.

// A queen in a chessboard can attack horizontally, vertically, and diagonally.
// Given an integer n, return all distinct solutions to the n-queens puzzle.
// Each solution contains a unique board layout
// where the queen pieces are placed. 'Q' indicates a queen and '.' indicates
// an empty space.

// You may return the answer in any order.

// nQueen II
// https://leetcode.com/problems/n-queens-ii/description/

class Solution {
  /**
   * Solves the n-queens problem.
   * @param {number} n - The size of the chessboard (n x n).
   * @return {string[][]} - All distinct solutions to the n-queens puzzle.
   */
  solveNQueens (n) {
    // Sets to keep track of the unavailable columns and diagonals
    const col = new Set()
    const posDiag = new Set() // Positive diagonals (r + c)
    const negDiag = new Set() // Negative diagonals (r - c)

    const res = [] // Array to store the final valid boards
    const board = Array.from({ length: n }, () => Array(n).fill('.')) // Initialize the board with empty spaces

    /**
     * Helper function to backtrack and try placing queens.
     * @param {number} r - The current row to place a queen.
     * @return {void}
     */
    function backtrack (r) {
      // If we've placed queens in all n rows, add the current board to results
      if (r === n) {
        res.push(board.map((row) => row.join('')))
        return
      }

      // Attempt to place a queen in every column of the current row
      for (let c = 0; c < n; c++) {
        // Skip the column if it's in attack range
        if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
          continue
        }

        // Mark the column and diagonals as occupied
        col.add(c)
        posDiag.add(r + c)
        negDiag.add(r - c)
        board[r][c] = 'Q' // Place the queen

        // Move to the next row
        backtrack(r + 1)

        // Backtrack: remove the queen and unmark the column and diagonals
        col.delete(c)
        posDiag.delete(r + c)
        negDiag.delete(r - c)
        board[r][c] = '.'
      }
    }

    // Start the backtracking from the first row
    backtrack(0)
    return res // Return all the valid board configurations
  }
}
