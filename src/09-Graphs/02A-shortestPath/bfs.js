// https://neetcode.io/problems/matrixBFS
// Matrix Breadth-First Search
// You are given a binary matrix Grid where 0s represent land
// and 1s represent rocks that can not be traversed.

// Return the length of the shortest path from the top-left corner of Grid
// to the bottom-right corner such that all traversed cells are land cells.
// You may only move vertically or horizontally through land cells.

// Note:

// If there is no such path, return -1.
// The length of a path is the number of moves from the starting cell to the ending cell.
// Example 1:

// Input: grid = [
//   [0, 0, 0, 0],
//   [1, 1, 0, 0],
//   [0, 0, 0, 1],
//   [0, 1, 0, 0]
// ]

// Output:
// 6

/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestPath = (grid) => {
  const ROWS = grid.length
  const COLS = grid[0].length
  const visit = new Set()
  const queue = []
  queue.push([0, 0])
  visit.add('0,0')

  let length = 0
  while (queue.length > 0) {
    const size = queue.length
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
        [-1, 0]
      ]
      for (const nei of neighbors) {
        const dr = nei[0]
        const dc = nei[1]
        if (
          Math.min(r + dr, c + dc) < 0 ||
          r + dr === ROWS ||
          c + dc === COLS ||
          visit.has(r + dr + ',' + (c + dc)) ||
          grid[r + dr][c + dc] === 1
        ) {
          continue
        }
        queue.push([r + dr, c + dc])
        visit.add(r + dr + ',' + (c + dc))
      }
    }
    length++
  }
  return -1
}
