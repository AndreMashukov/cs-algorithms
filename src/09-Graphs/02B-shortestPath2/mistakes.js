/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const COLS = grid.length;
  const ROWS = grid[0].length;
  const visited = new Set();
  const q = [[0, 0]]
  visited.add("0,0");
  let length = 0;

  while (q.length) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      if (r === ROWS - 1 && c === COLS - 1) {
        return length;
      }
      const neibors = [
        [1, 0], 
        [-1, 0], 
        [0, 1], 
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
      ];

      for (const [dr, dc] of neibors) {
        if (r + dr < 0 || r + dr === ROWS || c + dc < 0 || c + dc === COLS || visited.has(`${r + dr},${c + dc}`) || grid[r + dr][c + dc] === 1) {
          continue;
        }
        q.push([r + dr, c + dc]);
        visited.add(`${r + dr},${c + dc}`)
      }
    }
    length++
  }

  return -1;
};