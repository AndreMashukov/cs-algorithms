// 1091. Shortest Path in Binary Matrix
// https://leetcode.com/problems/shortest-path-in-binary-matrix/description/
// Given an n x n binary matrix grid, return the length
// of the shortest clear path in the matrix.
// If there is no clear path, return -1.

// A clear path in a binary matrix
// is a path from the top-left cell (i.e., (0, 0))
// to the bottom-right cell (i.e., (n - 1, n - 1))
// such that:
// All the visited cells of the path are 0.
// All the adjacent cells of the path are 8-directionally connected
// (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number
// of visited cells of this path.

/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestPathBinaryMatrix = (grid) => {
  const ROWS = grid.length
  const COLS = grid[0].length

  if (grid[0][0] === 1 || grid[ROWS - 1][COLS - 1] === 1) {
    return -1
  }

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
    length++
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()
      if (r === ROWS - 1 && c === COLS - 1) {
        return length
      }

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          enqueue(r + dr, c + dc)
        }
      }
    }
  }

  return -1
}
