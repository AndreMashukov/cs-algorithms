// 73. Set Matrix Zeroes
// https://leetcode.com/problems/set-matrix-zeroes/description/?envType=problem-list-v2&envId=hash-table
// https://www.youtube.com/watch?v=T41rL0L3Pnw
// Given an m x n integer matrix matrix,
// if an element is 0, set its entire row and column to 0's.
// You must do it in place.

const setZeroes = function (matrix) {
  const ROWS = matrix.length
  const COLS = matrix[0].length

  // Variables to store if the first row and column have any zeros
  let rowZero = false
  let colZero = false

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (matrix[i][j] === 0) {
        if (i === 0) rowZero = true
        if (j === 0) colZero = true
        matrix[0][j] = 0
        matrix[i][0] = 0
      }
    }
  }

  // Iterate over the matrix and use the first row and first column to mark the zeros
  for (let i = 1; i < ROWS; i++) {
    for (let j = 1; j < COLS; j++) {
      if (matrix[0][j] === 0 || matrix[i][0] === 0) {
        matrix[i][j] = 0
      }
    }
  }

  // If the first row had a zero, set all elements in the first row to zero
  if (rowZero) {
    for (let j = 0; j < COLS; j++) {
      matrix[0][j] = 0
    }
  }

  // If the first column had a zero, set all elements in the first column to zero
  if (colZero) {
    for (let i = 0; i < ROWS; i++) {
      matrix[i][0] = 0
    }
  }
}

// Initial Matrix:
// 1 2 3
// 4 0 6
// 7 8 9

// First Pass:
// Iterate through the matrix to find zeroes.
// When i = 1 and j = 1, matrix[1][1] is 0.
// Set rowZero and colZero flags if zero is
// in the first row or column (not applicable here).
// Set matrix[0][1] and matrix[1][0] to 0.
// 1 0 3
// 0 0 6
// 7 8 9

// Second Pass:
// Iterate through the matrix again (excluding the first row and column).
// When i = 1 and j = 1, matrix[0][1] or matrix[1][0] is 0, so set matrix[1][1] to 0 (already 0).
// When i = 1 and j = 2, matrix[0][2] or matrix[1][0] is 0, so set matrix[1][2] to 0.
// When i = 2 and j = 1, matrix[0][1] or matrix[2][0] is 0, so set matrix[2][1] to 0.
// 1 0 3
// 0 0 0
// 7 0 9
