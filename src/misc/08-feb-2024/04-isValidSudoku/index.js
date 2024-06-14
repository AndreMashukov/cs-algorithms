// Sudoku is a number-placement puzzle.
// The objective is to fill a 9 × 9 grid with numbers
//  in such a way that each column, each row,
// and each of the nine 3 × 3 sub-grids that compose the grid
// all contain all of the numbers from 1 to 9 one time.

// Determine if a 9 x 9 Sudoku board is valid
const isValidSudoku = (board) => {
  // arrays of 9 sets each
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

// Let's say we're checking the cell at row 4, column 5
// (remember, indices start from 0).
// Here's how we'd calculate the boxIndex:
// Calculate Math.floor(i / 3) * 3:
// This gives the starting row index of the box.
// For i = 4, Math.floor(4 / 3) * 3 equals 1 * 3, which is 3.

// Calculate Math.floor(j / 3): This gives the starting
// column index of the box. For j = 5, Math.floor(5 / 3) equals 1.

// Add the results together: 3 + 1 equals 4.

// So, the cell at row 4, column 5 belongs to box 4.

// 0 0 0 | 1 1 1 | 2 2 2
// 0 0 0 | 1 1 1 | 2 2 2
// 0 0 0 | 1 1 1 | 2 2 2
// ------+-------+------
// 3 3 3 | 4 4 4 | 5 5 5
// 3 3 3 | 4 4 4 | 5 5 5
// 3 3 3 | 4 4 4 | 5 5 5
// ------+-------+------
// 6 6 6 | 7 7 7 | 8 8 8
// 6 6 6 | 7 7 7 | 8 8 8
// 6 6 6 | 7 7 7 | 8 8 8

// https://www.youtube.com/watch?v=TjFXEUCMqI8
