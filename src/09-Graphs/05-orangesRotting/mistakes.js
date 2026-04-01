/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  let fresh = 0
  let time = 0;
  const q = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 1) {
        fresh++
      }
      if (grid[r][c] == 2) {
        q.push([r, c])
      }
    }
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  while (fresh > 0 && q.length > 0) {
    const size = q.length 
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      for (let [dr, dc] of dirs) {
        const row = r + dr;
        const col = c + dc;

        if (row >= 0 && row < ROWS && col >= 0 && col < COLS && grid[row][col] === 1) {
          grid[row][col] = 2;
          fresh--
          q.push([row, col])
        }
      }
    }
    time++
  }

  return fresh === 0 ? time : -1;
};