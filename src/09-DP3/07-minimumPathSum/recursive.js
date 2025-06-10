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
 * Recursive solution with memoization for Minimum Path Sum
 * This approach uses DFS with memoization to find the minimum sum path
 * @param {number[][]} grid - 2D grid with non-negative numbers
 * @return {number} - Minimum sum from top-left to bottom-right
 */
function minPathSum(grid) {
    // Get grid dimensions
    const m = grid.length;
    const n = grid[0].length;
    
    // Create memoization cache to store computed minimum sums
    const memo = new Map();
    
    /**
     * Recursive helper function to find minimum path sum from current position to target
     * @param {number} row - Current row position
     * @param {number} col - Current column position
     * @return {number} - Minimum sum from current position to bottom-right
     */
    function findMinSum(row, col) {
        // Base case: reached the target (bottom-right corner)
        if (row === m - 1 && col === n - 1) {
            return grid[row][col];
        }
        
        // Base case: out of bounds (return large value to avoid this path)
        if (row >= m || col >= n) {
            return Infinity;
        }
        
        // Create unique key for memoization
        const key = `${row}-${col}`;
        
        // Check if result already computed and cached
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        // Calculate minimum sum by exploring right and down moves
        const rightPath = findMinSum(row, col + 1);
        const downPath = findMinSum(row + 1, col);
        
        // Current cell cost + minimum of right and down paths
        const minSum = grid[row][col] + Math.min(rightPath, downPath);
        
        // Cache the result for future use
        memo.set(key, minSum);
        
        // Return minimum sum from current position
        return minSum;
    }
    
    // Start the recursive search from top-left corner (0, 0)
    return findMinSum(0, 0);
}

/**
 * Alternative recursive implementation with explicit bounds checking
 * @param {number[][]} grid - 2D grid with values
 * @return {number} - Minimum path sum
 */
function minPathSumAlt(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const memo = {};
    
    /**
     * Helper function with bounds validation
     * @param {number} i - Row index
     * @param {number} j - Column index
     * @return {number} - Minimum sum from (i,j) to destination
     */
    function solve(i, j) {
        // Bounds check
        if (i < 0 || i >= m || j < 0 || j >= n) {
            return Infinity;
        }
        
        // Target reached
        if (i === m - 1 && j === n - 1) {
            return grid[i][j];
        }
        
        // Memoization check
        const key = i + ',' + j;
        if (memo[key] !== undefined) {
            return memo[key];
        }
        
        // Compute minimum sum: current cell + min(right, down)
        const right = solve(i, j + 1);
        const down = solve(i + 1, j);
        memo[key] = grid[i][j] + Math.min(right, down);
        
        return memo[key];
    }
    
    return solve(0, 0);
}

/**
 * Recursive solution with path tracking for debugging
 * @param {number[][]} grid - Input grid
 * @return {object} - Object containing minimum sum and path
 */
function minPathSumWithPath(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const memo = new Map();
    
    function solve(row, col) {
        if (row === m - 1 && col === n - 1) {
            return { sum: grid[row][col], path: [[row, col]] };
        }
        
        if (row >= m || col >= n) {
            return { sum: Infinity, path: [] };
        }
        
        const key = `${row}-${col}`;
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        const rightResult = solve(row, col + 1);
        const downResult = solve(row + 1, col);
        
        let result;
        if (rightResult.sum <= downResult.sum) {
            result = {
                sum: grid[row][col] + rightResult.sum,
                path: [[row, col], ...rightResult.path]
            };
        } else {
            result = {
                sum: grid[row][col] + downResult.sum,
                path: [[row, col], ...downResult.path]
            };
        }
        
        memo.set(key, result);
        return result;
    }
    
    return solve(0, 0);
}

// Example usage:
// console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // Output: 7
// console.log(minPathSum([[1,2,3],[4,5,6]])); // Output: 12