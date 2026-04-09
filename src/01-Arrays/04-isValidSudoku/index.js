// 36. Valid Sudoku
// https://leetcode.com/problems/valid-sudoku/
// https://www.youtube.com/watch?v=TjFXEUCMqI8&t=601s
// Determine if a 9 x 9 Sudoku board is valid.
// Only the filled cells need to be validated according to the following rules:
// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:
// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

class Solution {
  /**
   * @param {character[][]} board
   * @return {boolean}
   */
  isValidSudoku (board) {
    const rows = Array(9).fill(0).map(() => new Set())
    const cols = Array(9).fill(0).map(() => new Set())
    const boxes = Array(9).fill(0).map(() => new Set())
    const ROWS = board.length
    const COLS = board[0].length
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const num = board[r][c]
        if (num !== '.') {
          const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3)
          // console.log(r, c, boxIndex)
          if (rows[r].has(num) || cols[c].has(num || boxes[boxIndex].has(num))) {
            return false
          }

          rows[r].add(num)
          cols[c].add(num)
          boxes[boxIndex].add(num)
        }
      }
    }

    return true
  }
}
