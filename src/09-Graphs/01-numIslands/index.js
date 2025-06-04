// Given a 2D grid grid where '1' represents land
// and '0' represents water,
// count and return the number of islands.

// An island is formed by connecting adjacent lands horizontally
// or vertically and is surrounded by water.
// You may assume water is surrounding the grid
// (i.e., all the edges are water).

const numIslands = (grid) => {
  let count = 0

  // Define the dfs function inside numIslands to create a closure
  const dfs = (i, j) => {
    // Base case: if the current cell is out of bounds or is water, return
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[0].length ||
      grid[i][j] === '0'
    ) {
      return
    }
    // Mark the current cell as visited by setting it to '0'
    grid[i][j] = '0'
    // Recursively visit all adjacent cells (up, down, left, right)
    dfs(i + 1, j)
    dfs(i, j + 1)
    dfs(i - 1, j)
    dfs(i, j - 1)
  }

  // Iterate through each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // If the cell is land ('1'), perform a DFS to mark the entire island
      if (grid[i][j] === '1') {
        dfs(i, j)
        count++
      }
    }
  }

  // Return the total number of islands found
  return count
}

// Example usage
const grid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1']
]
console.log(numIslands(grid)) // Output: 3
