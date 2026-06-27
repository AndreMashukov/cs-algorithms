/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
    return -1
  }

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0],  [1, 1]
  ]
  const queue = [[0, 0, 1]]
  grid[0][0] = 1
  let head = 0;

  while (head < queue.length) {
    const [row, col, length] = queue[head++];

    if (row === n - 1 && col === n - 1) {
      return length 
    }

    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && grid[newRow][newCol] === 0) {
        queue.push([newRow, newCol, length + 1])
        grid[newRow][newCol] = 1;
      }
    }
  }

  return -1
};