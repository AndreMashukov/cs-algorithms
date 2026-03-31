// NO LEETCODE VERSION
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
  const queue = [[0, 0]]
  visit.add('0,0')

  const enqueue = (nr, nc) => {
    if (nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS) return
    const key = `${nr},${nc}`
    if (visit.has(key) || grid[nr][nc] === 1) return
    queue.push([nr, nc])
    visit.add(key)
  }

  let length = 0
  while (queue.length > 0) {
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()
      if (r === ROWS - 1 && c === COLS - 1) {
        return length
      }

      enqueue(r, c + 1)
      enqueue(r, c - 1)
      enqueue(r + 1, c)
      enqueue(r - 1, c)
    }
    length++
  }
  return -1
}
