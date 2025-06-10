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
 * Dynamic Programming solution for Unique Paths II
 * This approach builds a DP table where dp[i][j] represents number of paths to reach cell (i,j)
 * @param {number[][]} obstacleGrid - 2D grid where 1 represents obstacles
 * @return {number} - Number of unique paths from top-left to bottom-right
 */
function uniquePathsWithObstacles(obstacleGrid) {
    // Get grid dimensions
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    // Handle edge case: start or end has obstacle
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }
    
    // Create DP table where dp[i][j] = number of ways to reach cell (i,j)
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    
    // Initialize starting position
    dp[0][0] = 1;
    
    // Fill first row: can only come from left
    for (let j = 1; j < n; j++) {
        if (obstacleGrid[0][j] === 0) {
            dp[0][j] = dp[0][j - 1];
        }
        // If obstacle, dp[0][j] remains 0
    }
    
    // Fill first column: can only come from above
    for (let i = 1; i < m; i++) {
        if (obstacleGrid[i][0] === 0) {
            dp[i][0] = dp[i - 1][0];
        }
        // If obstacle, dp[i][0] remains 0
    }
    
    // Fill rest of DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) {
                // Can reach from top or left
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
            // If obstacle, dp[i][j] remains 0
        }
    }
    
    // Return number of paths to bottom-right corner
    return dp[m - 1][n - 1];
}

/**
 * Space-optimized DP solution using 1D array
 * Since we only need previous row, we can optimize space from O(m*n) to O(n)
 * @param {number[][]} obstacleGrid - 2D grid with obstacles
 * @return {number} - Number of unique paths
 */
function uniquePathsWithObstaclesOptimized(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    // Handle edge cases
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }
    
    // Use 1D DP array representing current row
    const dp = Array(n).fill(0);
    dp[0] = 1; // Starting position
    
    // Process each row
    for (let i = 0; i < m; i++) {
        // Update dp array for current row
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                // Obstacle: no paths through this cell
                dp[j] = 0;
            } else if (j > 0) {
                // Add paths from left cell (dp[j-1]) to paths from above (dp[j])
                dp[j] = dp[j] + dp[j - 1];
            }
            // For j=0 and no obstacle, dp[j] keeps value from above
        }
    }
    
    // Return paths to bottom-right corner
    return dp[n - 1];
}

/**
 * In-place DP solution modifying the input grid
 * This approach reuses the input grid as DP table to save space
 * @param {number[][]} obstacleGrid - 2D grid (will be modified)
 * @return {number} - Number of unique paths
 */
function uniquePathsWithObstaclesInPlace(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    // Check start and end
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }
    
    // Transform grid: 0 -> paths count, 1 -> remains 0 (obstacle)
    obstacleGrid[0][0] = 1; // Starting point has 1 path
    
    // Fill first row
    for (let j = 1; j < n; j++) {
        obstacleGrid[0][j] = (obstacleGrid[0][j] === 0 && obstacleGrid[0][j - 1] === 1) ? 1 : 0;
    }
    
    // Fill first column
    for (let i = 1; i < m; i++) {
        obstacleGrid[i][0] = (obstacleGrid[i][0] === 0 && obstacleGrid[i - 1][0] === 1) ? 1 : 0;
    }
    
    // Fill rest of grid
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) {
                obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
            } else {
                obstacleGrid[i][j] = 0; // Obstacle
            }
        }
    }
    
    return obstacleGrid[m - 1][n - 1];
}

// Example usage:
// console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])); // Output: 2
// console.log(uniquePathsWithObstaclesOptimized([[0,1],[0,0]])); // Output: 1