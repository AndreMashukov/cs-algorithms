// Determine if a 9 x 9 Sudoku board is valid
const isValidSudoku = (board) => {
  const rows = new Array(9).fill(0).map(() => new Set())
  const cols = new Array(9).fill(0).map(() => new Set())
  const boxes = new Array(9).fill(0).map(() => new Set())

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j]
      if (num === '.') continue

      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false
      }

      rows[i].add(num)
      cols[j].add(num)
      boxes[boxIndex].add(num)
    }
  }

  return true
}
