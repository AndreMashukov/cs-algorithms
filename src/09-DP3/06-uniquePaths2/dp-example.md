Problem: Unique Paths II (Space-Optimized Dynamic Programming Example)

Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Goal: Find number of unique paths from top-left to bottom-right using O(n) space

Grid visualization:
  0 1 2
0 S . .
1 . X .  (X = obstacle)
2 . . E

Expected Output: 2 paths

Space-Optimized Solution - Step-by-Step:

1. Initialize 1D DP array (size n=3):
   dp = [0,0,0]
   Set starting position: dp[0] = 1
   dp = [1,0,0]

2. Process Row 0 (i=0):
   j=0: Already set to 1
   j=1: dp[1] = dp[1] + dp[0] = 0 + 1 = 1
   j=2: dp[2] = dp[2] + dp[1] = 0 + 1 = 1
   After row: dp = [1,1,1]

3. Process Row 1 (i=1):
   j=0: Keep dp[0] = 1 (no obstacle)
   j=1: Set dp[1] = 0 (obstacle at grid[1][1])
   j=2: dp[2] = dp[2] + dp[1] = 1 + 0 = 1
   After row: dp = [1,0,1]

4. Process Row 2 (i=2):
   j=0: Keep dp[0] = 1 (no obstacle)
   j=1: dp[1] = dp[1] + dp[0] = 0 + 1 = 1
   j=2: dp[2] = dp[2] + dp[1] = 1 + 1 = 2
   After row: dp = [1,1,2]

Final result: dp[2] = 2 paths

Memory Usage Visualization:

Initial:     [1,0,0]
After Row 0: [1,1,1]  ← Paths considering only first row
After Row 1: [1,0,1]  ← Updated with obstacle in middle
After Row 2: [1,1,2]  ← Final paths to each column in last row

Key Space Optimization Concepts:
1. Uses single array of width n instead of m×n grid
2. Each position dp[j] represents paths to current cell
3. When processing cell (i,j):
   - dp[j] holds paths from cell above (i-1,j)
   - dp[j-1] holds paths from cell to left (i,j-1)
4. Update formula: dp[j] += dp[j-1] (if no obstacle)
5. Obstacles reset cell to 0: dp[j] = 0

Space Complexity: O(n) where n is grid width
Time Complexity: O(m×n) as we still process each cell once

This approach achieves the same result as 2D DP but with minimal memory usage.