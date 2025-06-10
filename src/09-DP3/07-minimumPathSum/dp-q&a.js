/*
 * Minimum Path Sum - DP Q&A
 * https://leetcode.com/problems/minimum-path-sum/
 * 
 * Questions and Answers about the Dynamic Programming Approach
 */

/*
Q1: How do you initialize the DP array for the minPathSum problem?
A1: Initialize a 2D DP array where dp[i][j] represents the minimum path sum to reach cell (i,j):
    const dp = Array(m).fill().map(() => Array(n).fill(0));
    Set dp[0][0] = grid[0][0] (starting position has its own value).
    Then initialize the first row and first column since they can only be reached 
    from one direction (either left or top respectively).
*/

/*
Q2: How do you fill the first row and first column of the DP array?
A2: First row (can only come from left):
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j-1] + grid[0][j];
    }
    
    First column (can only come from top):
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }
    
    These cells have only one possible path, so we accumulate the sum along that direction.
*/

/*
Q3: What is the recurrence relation for the DP solution?
A3: For each cell (i,j) where i > 0 and j > 0:
    dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1])
    
    This means the minimum path sum to reach (i,j) equals the current cell value plus
    the minimum of:
    - The minimum path sum from the cell above (i-1,j)
    - The minimum path sum from the cell to the left (i,j-1)
*/

/*
Q4: How does the space-optimized DP solution work?
A4: Use two 1D arrays to represent the current and previous rows:
    let prev = Array(n).fill(0);
    let curr = Array(n).fill(0);
    
    For each row, calculate curr[j] based on:
    curr[j] = grid[i][j] + Math.min(prev[j], curr[j-1])
    - prev[j]: minimum path sum from above
    - curr[j-1]: minimum path sum from left in current row
    
    This reduces space complexity from O(m*n) to O(n).
*/

/*
Q5: What is the time and space complexity of different DP approaches?
A5: 2D DP Approach:
    - Time: O(m * n) - visit each cell once
    - Space: O(m * n) - 2D DP array
    
    Space-Optimized Approach:
    - Time: O(m * n) - same time complexity  
    - Space: O(n) - only store current and previous row
    
    In-Place Approach:
    - Time: O(m * n) - same time complexity
    - Space: O(1) - modify input grid directly (if allowed)
*/

/*
Q6: How do you handle the boundary conditions in the DP approach?
A6: Boundary conditions are handled during initialization and main loop:
    1. Initialize dp[0][0] = grid[0][0] (starting position)
    2. First row: dp[0][j] = dp[0][j-1] + grid[0][j] (only left movement possible)
    3. First column: dp[i][0] = dp[i-1][0] + grid[i][0] (only downward movement possible)
    4. For other cells: check both i-1 and j-1 are valid (which they always are after initialization)
    
    This ensures we never access out-of-bounds indices.
*/

/*
Q7: How does the in-place DP modification work on the original grid?
A7: Modify the grid directly to store minimum path sums:
    1. First row: grid[0][j] += grid[0][j-1] (accumulate from left)
    2. First column: grid[i][0] += grid[i-1][0] (accumulate from top)
    3. For other cells: grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1])
    
    The original grid values are preserved during calculation since we process
    left-to-right, top-to-bottom. The final answer is in grid[m-1][n-1].
    
    Use this only when modifying the input is acceptable.
*/