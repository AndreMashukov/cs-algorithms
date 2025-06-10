/*
 * Unique Paths II - DP Q&A
 * https://leetcode.com/problems/unique-paths-ii/
 * 
 * Questions and Answers about the Dynamic Programming Approach
 */

/*
Q1: How do you initialize the DP array for the uniquePathsWithObstacles problem?
A1: Initialize a 2D DP array where dp[i][j] represents the number of paths to reach cell (i,j):
    const dp = Array(m).fill().map(() => Array(n).fill(0));
    The first cell dp[0][0] is set to 1 if obstacleGrid[0][0] === 0 (no obstacle), otherwise 0.
    All cells with obstacles are automatically 0, and we build up from valid starting positions.
*/

/*
Q2: How do you handle obstacles when filling the DP array?
A2: Before processing any cell, check if it contains an obstacle:
    if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0; // No paths through obstacles
        continue;
    }
    If there's an obstacle, skip to the next cell. Only process cells without obstacles,
    ensuring paths never go through blocked positions.
*/

/*
Q3: What is the recurrence relation for the DP solution?
A3: For each cell (i,j) without an obstacle:
    dp[i][j] = dp[i-1][j] + dp[i][j-1]
    This means the number of paths to (i,j) equals the sum of:
    - Paths from the cell above (i-1,j) if it exists and has no obstacle
    - Paths from the cell to the left (i,j-1) if it exists and has no obstacle
    Handle boundary conditions by checking array bounds before accessing.
*/

/*
Q4: How does the space-optimized DP solution work with only one row?
A4: Use a 1D array representing the current row being processed:
    let prev = Array(n).fill(0);
    For each row, create a new array and fill it based on:
    curr[j] = curr[j-1] + prev[j] (if no obstacle)
    - curr[j-1]: paths from left in current row
    - prev[j]: paths from above (previous row)
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
Q6: How do you handle the first row and first column initialization?
A6: First row initialization:
    for (let j = 1; j < n; j++) {
        if (obstacleGrid[0][j] === 0) {
            dp[0][j] = dp[0][j-1]; // Inherit from left
        }
    }
    
    First column initialization:
    for (let i = 1; i < m; i++) {
        if (obstacleGrid[i][0] === 0) {
            dp[i][0] = dp[i-1][0]; // Inherit from above
        }
    }
    
    Any obstacle in first row/column blocks all subsequent cells in that direction.
*/

/*
Q7: How does the in-place DP modification work on the original grid?
A7: Modify the obstacleGrid directly to store path counts:
    1. Convert the first valid cell from 0 to 1 (1 path to start)
    2. For each cell: if obstacleGrid[i][j] === 0 (no obstacle):
       obstacleGrid[i][j] = obstacleGrid[i-1][j] + obstacleGrid[i][j-1]
    3. Obstacles remain as 1, effectively contributing 0 to path sums
    
    This saves space but destroys the original input. The final answer is in 
    obstacleGrid[m-1][n-1]. Use this approach only when input modification is acceptable.
*/