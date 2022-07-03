const naive = (matrix, x, y) => {
  const processPoint = (x, y) => {
    let count = 0;
    // Above
    if (matrix[x - 1] !== undefined) {
      if (matrix[x - 1][y]) {
        count++;
      }
    }
    // Below
    if (matrix[x + 1] !== undefined) {
      if (matrix[x + 1][y]) {
        count++;
      }
    }
    // Left
    if (matrix[y - 1] !== undefined) {
      if (matrix[x][y - 1]) {
        count++;
      }
    }
    // Right
    if (matrix[y + 1] !== undefined) {
      if (matrix[x][y + 1]) {
        count++;
      }
    }
    // Top Left
    if (matrix[x - 1] !== undefined) {
      if (matrix[x - 1][y - 1]) {
        count++;
      }
    }
    // Top Right
    if (matrix[x - 1] !== undefined) {
      if (matrix[x - 1][y + 1]) {
        count++;
      }
    }
    // Bottom Left
    if (matrix[x + 1] !== undefined) {
      if (matrix[x - 1][y - 1]) {
        count++;
      }
    }
    // Bottom Left
    if (matrix[x + 1] !== undefined) {
      if (matrix[x - 1][y + 1]) {
        count++;
      }
    }

    board[x][y] = count;
  };
  const board = [];
  for (let x = 0; x < matrix.length; x++) {
    board.push([]);
    for (let y = 0; y < matrix[0].length; y++) {
      board[x][y] = -1;
    }
  }
  processPoint(x, y);
  console.log('&&&&', board);
  return board;
};

module.exports.minesweeper = { naive };
