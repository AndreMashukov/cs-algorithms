// 64. Minimum Path Sum
// https://leetcode.com/problems/minimum-path-sum/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right,
// which minimizes the sum of all numbers along its path.
// Note: You can only move either down or right at any point in time.
//
// Example 1:
// Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
// Output: 7
// Explanation: Because the path 1 → 1 → 1 → 1 → 2 → 1 minimizes the sum.
//
// Example 2:
// Input: grid = [[1,2,3],[4,5,6]]
// Output: 12
//
// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 200
// 0 <= grid[i][j] <= 200

/**
 * Dynamic Programming solution for Minimum Path Sum
 * This approach builds a DP table where dp[i][j] represents minimum sum to reach cell (i,j)
 * @param {number[][]} grid - 2D grid with non-negative numbers
 * @return {number} - Minimum sum from top-left to bottom-right
 */
function minPathSum(grid) {
    // Get grid dimensions
    const m = grid.length;
    const n = grid[0].length;
    
    // Create DP table where dp[i][j] = minimum sum to reach cell (i,j)
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    
    // Initialize starting position
    dp[0][0] = grid[0][0];
    
    // Fill first row: can only come from left
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    // Fill first column: can only come from above
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // Fill rest of DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // Minimum sum = current cell + min(from above, from left)
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    // Return minimum sum to reach bottom-right corner
    return dp[m - 1][n - 1];
}

/**
 * Space-optimized DP solution using 1D array
 * Since we only need previous row, we can optimize space from O(m*n) to O(n)
 * @param {number[][]} grid - 2D grid with values
 * @return {number} - Minimum path sum
 */
function minPathSumOptimized(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // Use 1D DP array representing current row
    const dp = Array(n).fill(0);
    
    // Initialize first element
    dp[0] = grid[0][0];
    
    // Fill first row
    for (let j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }
    
    // Process remaining rows
    for (let i = 1; i < m; i++) {
        // Update first column (can only come from above)
        dp[0] += grid[i][0];
        
        // Update rest of columns
        for (let j = 1; j < n; j++) {
            // dp[j] represents value from above (previous row)
            // dp[j-1] represents value from left (current row)
            dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
        }
    }
    
    // Return minimum sum to reach bottom-right corner
    return dp[n - 1];
}

/**
 * In-place DP solution modifying the input grid
 * This approach reuses the input grid as DP table to save space
 * @param {number[][]} grid - 2D grid (will be modified)
 * @return {number} - Minimum path sum
 */
function minPathSumInPlace(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // Fill first row: accumulate sums from left
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }
    
    // Fill first column: accumulate sums from above
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }
    
    // Fill rest of grid
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // Current cell + minimum of (above, left)
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    
    // Return result from bottom-right corner
    return grid[m - 1][n - 1];
}

/**
 * DP solution with clear state transitions for educational purposes
 * @param {number[][]} grid - Input grid
 * @return {number} - Minimum path sum
 */
function minPathSumExplicit(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // Create DP table
    const dp = Array(m).fill(null).map(() => Array(n).fill(Infinity));
    
    // Base case
    dp[0][0] = grid[0][0];
    
    // Fill DP table
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue; // Skip base case
            
            let minSum = Infinity;
            
            // Can come from above
            if (i > 0) {
                minSum = Math.min(minSum, dp[i - 1][j]);
            }
            
            // Can come from left
            if (j > 0) {
                minSum = Math.min(minSum, dp[i][j - 1]);
            }
            
            // Update current cell
            dp[i][j] = grid[i][j] + minSum;
        }
    }
    
    return dp[m - 1][n - 1];
}

// Example usage:
// console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // Output: 7
// console.log(minPathSumOptimized([[1,2,3],[4,5,6]])); // Output: 12