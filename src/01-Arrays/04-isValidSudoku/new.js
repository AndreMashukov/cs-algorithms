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
