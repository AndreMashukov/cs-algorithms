Problem: Minimum Path Sum (Dynamic Programming Example)

Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Goal: Find minimum path sum from top-left to bottom-right

Grid visualization:
  0 1 2
0 1 3 1
1 1 5 1
2 4 2 1

Expected Output: 7 (optimal path: 1→3→1→1→1)

2D DP Approach - Step-by-Step:

1. Initialize DP array (3x3):
   dp = [[0,0,0],[0,0,0],[0,0,0]]

2. Set starting position:
   dp[0][0] = grid[0][0] = 1
   dp = [[1,0,0],[0,0,0],[0,0,0]]

3. Initialize first row (accumulate from left):
   dp[0][1] = dp[0][0] + grid[0][1] = 1 + 3 = 4
   dp[0][2] = dp[0][1] + grid[0][2] = 4 + 1 = 5
   dp = [[1,4,5],[0,0,0],[0,0,0]]

4. Initialize first column (accumulate from top):
   dp[1][0] = dp[0][0] + grid[1][0] = 1 + 1 = 2
   dp[2][0] = dp[1][0] + grid[2][0] = 2 + 4 = 6
   dp = [[1,4,5],[2,0,0],[6,0,0]]

5. Fill remaining cells using recurrence relation:
   dp[1][1] = grid[1][1] + min(dp[0][1], dp[1][0])
            = 5 + min(4, 2) = 5 + 2 = 7
   
   dp[1][2] = grid[1][2] + min(dp[0][2], dp[1][1])
            = 1 + min(5, 7) = 1 + 5 = 6
   
   dp[2][1] = grid[2][1] + min(dp[1][1], dp[2][0])
            = 2 + min(7, 6) = 2 + 6 = 8
   
   dp[2][2] = grid[2][2] + min(dp[1][2], dp[2][1])
            = 1 + min(6, 8) = 1 + 6 = 7

Final DP array:
dp = [[1,4,5],[2,7,6],[6,8,7]]

Output: dp[2][2] = 7

Space-Optimized DP Approach:

1. Process row 0:
   curr = [1, 4, 5] (accumulated from left)
   prev = [1, 4, 5]

2. Process row 1:
   curr[0] = grid[1][0] + prev[0] = 1 + 1 = 2
   curr[1] = grid[1][1] + min(prev[1], curr[0]) = 5 + min(4, 2) = 7
   curr[2] = grid[1][2] + min(prev[2], curr[1]) = 1 + min(5, 7) = 6
   prev = [2, 7, 6]

3. Process row 2:
   curr[0] = grid[2][0] + prev[0] = 4 + 2 = 6
   curr[1] = grid[2][1] + min(prev[1], curr[0]) = 2 + min(7, 6) = 8
   curr[2] = grid[2][2] + min(prev[2], curr[1]) = 1 + min(6, 8) = 7

Output: curr[2] = 7

In-Place DP Approach:

1. Process first row:
   grid[0][1] += grid[0][0] → 3 + 1 = 4
   grid[0][2] += grid[0][1] → 1 + 4 = 5
   grid = [[1,4,5],[1,5,1],[4,2,1]]

2. Process first column:
   grid[1][0] += grid[0][0] → 1 + 1 = 2
   grid[2][0] += grid[1][0] → 4 + 2 = 6
   grid = [[1,4,5],[2,5,1],[6,2,1]]

3. Process remaining cells:
   grid[1][1] += min(grid[0][1], grid[1][0]) = 5 + min(4, 2) = 7
   grid[1][2] += min(grid[0][2], grid[1][1]) = 1 + min(5, 7) = 6
   grid[2][1] += min(grid[1][1], grid[2][0]) = 2 + min(7, 6) = 8
   grid[2][2] += min(grid[1][2], grid[2][1]) = 1 + min(6, 8) = 7

Final modified grid:
grid = [[1,4,5],[2,7,6],[6,8,7]]

Output: grid[2][2] = 7

Optimal path reconstruction: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Original path values: 1 + 3 + 1 + 1 + 1 = 7