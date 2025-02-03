// 1091. Shortest Path in Binary Matrix
// Given an n x n binary matrix grid, return the length
// of the shortest clear path in the matrix.
// If there is no clear path, return -1.

// A clear path in a binary matrix
// is a path from the top-left cell (i.e., (0, 0))
// to the bottom-right cell (i.e., (n - 1, n - 1))
// such that:
// All the visited cells of the path are 0.
// All the adjacent cells of the path a
// re 8-directionally connected
// (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number
// of visited cells of this path.

/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestPathBinaryMatrix = function (grid) {
  const ROWS = grid.length
  const COLS = grid[0].length
  const visit = new Set()
  const queue = []
  queue.push([0, 0])
  visit.add('0,0')

  // If the starting or ending cell is blocked, return -1
  if (grid[0][0] === 1 || grid[ROWS - 1][COLS - 1] === 1) {
    return -1
  }

  let length = 0
  while (queue.length > 0) {
    const size = queue.length
    // ensure we skip blocked cells at the start/end
    // and increment length once per BFS level,
    // while also considering all 8 directions.
    length++
    for (let i = 0; i < size; i++) {
      const cell = queue.shift()
      const r = cell[0]
      const c = cell[1]
      if (r === ROWS - 1 && c === COLS - 1) {
        return length
      }

      const neighbors = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
      ]
      for (const neighbor of neighbors) {
        const dr = neighbor[0]
        const dc = neighbor[1]
        if (
          Math.min(r + dr, c + dc) < 0 ||
          r + dr === ROWS ||
          c + dc === COLS ||
          grid[r + dr][c + dc] === 1 ||
          visit.has(`${r + dr},${c + dc}`)
        ) {
          continue
        }
        queue.push([r + dr, c + dc])
        visit.add(`${r + dr},${c + dc}`)
      }
    }
  }

  return -1
}
