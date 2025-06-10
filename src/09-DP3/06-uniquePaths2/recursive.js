// 63. Unique Paths II
// https://leetcode.com/problems/unique-paths-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]).
// The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
// An obstacle and space are marked as 1 and 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.
// Return the number of possible unique paths that the robot can take to reach the bottom-right corner.
//
// Example 1:
// Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// Output: 2
// Explanation: There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right
//
// Example 2:
// Input: obstacleGrid = [[0,1],[0,0]]
// Output: 1
//
// Constraints:
// m == obstacleGrid.length
// n == obstacleGrid[i].length
// 1 <= m, n <= 100
// obstacleGrid[i][j] is 0 or 1.

/**
 * Recursive solution with memoization for Unique Paths II
 * This approach uses DFS with memoization to count paths while avoiding obstacles
 * @param {number[][]} obstacleGrid - 2D grid where 1 represents obstacles, 0 represents free space
 * @return {number} - Number of unique paths from top-left to bottom-right
 */
function uniquePathsWithObstacles(obstacleGrid) {
    // Get grid dimensions
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    // Check if start or end position has obstacle
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }
    
    // Create memoization cache for storing computed results
    const memo = new Map();
    
    /**
     * Recursive helper function to count unique paths from current position to target
     * @param {number} row - Current row position
     * @param {number} col - Current column position
     * @return {number} - Number of unique paths from current position to bottom-right
     */
    function countPaths(row, col) {
        // Base case: reached the target (bottom-right corner)
        if (row === m - 1 && col === n - 1) {
            return 1;
        }
        
        // Base case: out of bounds
        if (row >= m || col >= n) {
            return 0;
        }
        
        // Base case: hit an obstacle
        if (obstacleGrid[row][col] === 1) {
            return 0;
        }
        
        // Create unique key for memoization
        const key = `${row}-${col}`;
        
        // Check if result already computed and cached
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        // Calculate paths by moving right and down
        const pathsFromRight = countPaths(row, col + 1);
        const pathsFromDown = countPaths(row + 1, col);
        
        // Total paths = paths from moving right + paths from moving down
        const totalPaths = pathsFromRight + pathsFromDown;
        
        // Cache the result for future use
        memo.set(key, totalPaths);
        
        // Return total number of paths from current position
        return totalPaths;
    }
    
    // Start the recursive search from top-left corner (0, 0)
    return countPaths(0, 0);
}

/**
 * Alternative recursive implementation with explicit bounds checking
 * @param {number[][]} obstacleGrid - 2D grid with obstacles
 * @return {number} - Number of unique paths
 */
function uniquePathsWithObstaclesAlt(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const memo = {};
    
    /**
     * Helper function with explicit parameter validation
     * @param {number} i - Row index
     * @param {number} j - Column index
     * @return {number} - Number of paths from (i,j) to destination
     */
    function solve(i, j) {
        // Out of bounds check
        if (i < 0 || i >= m || j < 0 || j >= n) {
            return 0;
        }
        
        // Obstacle check
        if (obstacleGrid[i][j] === 1) {
            return 0;
        }
        
        // Target reached
        if (i === m - 1 && j === n - 1) {
            return 1;
        }
        
        // Memoization check
        const key = i + ',' + j;
        if (memo[key] !== undefined) {
            return memo[key];
        }
        
        // Compute result: sum of paths from right and down moves
        memo[key] = solve(i, j + 1) + solve(i + 1, j);
        return memo[key];
    }
    
    return solve(0, 0);
}

// Example usage:
// console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])); // Output: 2
// console.log(uniquePathsWithObstacles([[0,1],[0,0]])); // Output: 1