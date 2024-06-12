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
};

// Math.floor(i / 3) * 3:
// This determines the starting row index of the box.
// The Math.floor(i / 3) part divides the current row index i by 3
// and rounds down to the nearest integer.
// This maps rows 0-2 to 0, rows 3-5 to 1,
// and rows 6-8 to 2. Multiplying by 3 scales it up
// so that it maps to the first row of each box (0, 3, or 6).

// Math.floor(j / 3): This determines the starting column index of the box.
// It works similarly to the row calculation,
// mapping columns 0-2 to 0, columns 3-5 to 1,
// and columns 6-8 to 2.

// Math.floor(i / 3) * 3 + Math.floor(j / 3):
// This adds the row and column indices together to get the box index.
// The boxes are numbered from 0 to 8,
// starting from the top left box
// and moving left to right, top to bottom.

// So, boxIndex is used to map each cell in the Sudoku board
// to one of the 9 boxes.
// This allows the function to check if a number
// has already been used in the same box,
/// which is one of the rules of Sudoku.
