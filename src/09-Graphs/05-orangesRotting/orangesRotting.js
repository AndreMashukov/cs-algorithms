// LeetCode Problem: 994 Oranges Rotting
// https://leetcode.com/problems/rotting-oranges/description/
// You are given an m x n grid where each cell can have one of three values:
// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

class Solution {
  /**
     * @param {number[][]} grid
     * @return {number}
     */
  orangesRotting (grid) {
    // Initialize a queue to keep track of rotten oranges
    const q = []
    // Count of fresh oranges
    let fresh = 0
    // Time counter
    let time = 0

    // Iterate through the grid to count fresh oranges and enqueue rotten oranges
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === 1) {
          fresh++
        }
        if (grid[r][c] === 2) {
          q.push([r, c])
        }
      }
    }

    // Directions array to move in the four possible directions (right, left, down, up)
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]

    // Perform BFS to rot adjacent fresh oranges
    while (fresh > 0 && q.length > 0) {
      const length = q.length
      for (let i = 0; i < length; i++) {
        const [r, c] = q.shift()

        // Check all four directions
        for (const [dr, dc] of directions) {
          const row = r + dr
          const col = c + dc
          // If the adjacent cell is a fresh orange, rot it and enqueue it
          if (
            row >= 0 &&
              row < grid.length &&
              col >= 0 &&
              col < grid[0].length &&
              grid[row][col] === 1
          ) {
            grid[row][col] = 2
            q.push([row, col])
            fresh--
          }
        }
      }
      // Increment time after each level of BFS
      time++
    }

    // If there are no fresh oranges left, return the time, otherwise return -1
    return fresh === 0 ? time : -1
  }
}

const grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1]
]

console.log(new Solution().orangesRotting(grid)) // 4
