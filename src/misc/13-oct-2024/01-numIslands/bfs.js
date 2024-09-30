// Given a 2D grid grid where '1' represents land
// and '0' represents water,
// count and return the number of islands.

// An island is formed by connecting adjacent lands horizontally
// or vertically and is surrounded by water.
// You may assume water is surrounding the grid
// (i.e., all the edges are water).

const numIslands = (grid) => {
  const ROWS = grid.length
  const COLS = grid[0].length
  const visited = new Set()
  let count = 0

  // Breadth-First Search (BFS) function to traverse the island
  const bfs = (i, j) => {
    const queue = [[i, j]]

    while (queue.length) {
      const [row, col] = queue.shift()
      // Check if the current cell is out of bounds, is water, or has been visited
      if (
        row < 0 ||
        col < 0 ||
        row >= ROWS ||
        col >= COLS ||
        grid[row][col] === '0' ||
        visited.has(`${row},${col}`)
      ) {
        continue
      }
      // Mark the current cell as visited
      visited.add(`${row},${col}`)
      // Add all adjacent cells (up, down, left, right) to the queue
      queue.push([row + 1, col])
      queue.push([row, col + 1])
      queue.push([row - 1, col])
      queue.push([row, col - 1])
    }
  }

  // Iterate through each cell in the grid
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      // If the cell is land ('1') and has not been visited, perform a BFS
      if (grid[i][j] === '1' && !visited.has(`${i},${j}`)) {
        bfs(i, j)
        count++
      }
    }
  }

  // Return the total number of islands found
  return count
}

// Example usage
console.log(numIslands([
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1']
])) // Output: 3
