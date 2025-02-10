// 289. Game of Life
// https://leetcode.com/problems/game-of-life/description/
// https://www.youtube.com/watch?v=fei4bJQdBUQ
// According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

// The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

// Any live cell with fewer than two live neighbors dies as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by over-population.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
// The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the m x n grid board. In this process, births and deaths occur simultaneously.

// Given the current state of the board, update the board to reflect its next state.
// Note that you do not need to return anything.

const gameOfLife = function (board) {
  const ROWS = board.length // Number of rows in the board
  const COLS = board[0].length // Number of columns in the board

  // Helper function to count live neighbors of a cell
  const countLiveNeighbors = (r, c) => {
    let count = 0
    for (let i = r - 1; i <= r + 1; i++) {
      for (let j = c - 1; j <= c + 1; j++) {
        // Check if the neighboring cell is within bounds
        if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
          // Use bitwise AND to get the least significant bit (current state)
          count += board[i][j] & 1
        }
      }
    }

    // Subtract the cell itself from the count
    count -= board[r][c] & 1
    return count
  }

  // First pass: apply the rules to determine the next state
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const nei = countLiveNeighbors(r, c)
      // Rule 1 and 3: Any live cell with 2 or 3 live neighbors lives on to the next generation
      if (board[r][c] === 1 && nei >= 2 && nei <= 3) {
        board[r][c] = 3 // Mark as live in the next state (binary 11)
      }
      // Rule 4: Any dead cell with exactly 3 live neighbors becomes a live cell
      if (board[r][c] === 0 && nei === 3) {
        board[r][c] = 2 // Mark as live in the next state (binary 10)
      }
    }
  }

  // Second pass: update the board to the next state
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Right shift to get the next state
      if (board[r][c] === 2) {
        board[r][c] = 1
      } else if (board[r][c] === 3) {
        board[r][c] = 1
      } else {
        board[r][c] = 0
      }
    }
  }
}
