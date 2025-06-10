/*
 * Minimum Path Sum - DP Example
 * https://leetcode.com/problems/minimum-path-sum/
 * 
 * Step-by-step trace of the Dynamic Programming Approach
 */

/*
Example Input:
grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]

Grid visualization:
  0 1 2
0 1 3 1
1 1 5 1
2 4 2 1

Goal: Find minimum path sum from top-left (0,0) to bottom-right (2,2)
Expected Output: 7 (optimal path: 1→3→1→1→1)

2D DP Approach Step-by-Step:
*/

/*
STEP 1: Initialize DP array
m = 3, n = 3
dp = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

STEP 2: Set starting position
dp[0][0] = grid[0][0] = 1
dp = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

STEP 3: Initialize first row (can only come from left)
for j = 1 to 2:
  j = 1: dp[0][1] = dp[0][0] + grid[0][1] = 1 + 3 = 4
  j = 2: dp[0][2] = dp[0][1] + grid[0][2] = 4 + 1 = 5

dp = [
  [1, 4, 5],
  [0, 0, 0],
  [0, 0, 0]
]

STEP 4: Initialize first column (can only come from top)
for i = 1 to 2:
  i = 1: dp[1][0] = dp[0][0] + grid[1][0] = 1 + 1 = 2
  i = 2: dp[2][0] = dp[1][0] + grid[2][0] = 2 + 4 = 6

dp = [
  [1, 4, 5],
  [2, 0, 0],
  [6, 0, 0]
]

STEP 5: Fill remaining cells using recurrence relation
for i = 1 to 2:
  for j = 1 to 2:
    
    i = 1, j = 1:
    dp[1][1] = grid[1][1] + Math.min(dp[0][1], dp[1][0])
             = 5 + Math.min(4, 2) = 5 + 2 = 7
    
    i = 1, j = 2:
    dp[1][2] = grid[1][2] + Math.min(dp[0][2], dp[1][1])
             = 1 + Math.min(5, 7) = 1 + 5 = 6
    
    i = 2, j = 1:
    dp[2][1] = grid[2][1] + Math.min(dp[1][1], dp[2][0])
             = 2 + Math.min(7, 6) = 2 + 6 = 8
    
    i = 2, j = 2:
    dp[2][2] = grid[2][2] + Math.min(dp[1][2], dp[2][1])
             = 1 + Math.min(6, 8) = 1 + 6 = 7

Final DP array:
dp = [
  [1, 4, 5],
  [2, 7, 6],
  [6, 8, 7]
]

RESULT: dp[2][2] = 7
Optimal path: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Path sum: 1 + 3 + 1 + 1 + 1 = 7
*/

/*
Space-Optimized DP Approach:
Using O(n) space with two 1D arrays

STEP 1: Initialize arrays
prev = [0, 0, 0]
curr = [0, 0, 0]

STEP 2: Process row 0
curr[0] = grid[0][0] = 1
curr[1] = grid[0][1] + curr[0] = 3 + 1 = 4
curr[2] = grid[0][2] + curr[1] = 1 + 4 = 5
curr = [1, 4, 5]
prev = curr = [1, 4, 5]

STEP 3: Process row 1
curr = [0, 0, 0]
curr[0] = grid[1][0] + prev[0] = 1 + 1 = 2
curr[1] = grid[1][1] + Math.min(prev[1], curr[0]) = 5 + Math.min(4, 2) = 5 + 2 = 7
curr[2] = grid[1][2] + Math.min(prev[2], curr[1]) = 1 + Math.min(5, 7) = 1 + 5 = 6
curr = [2, 7, 6]
prev = curr = [2, 7, 6]

STEP 4: Process row 2
curr = [0, 0, 0]
curr[0] = grid[2][0] + prev[0] = 4 + 2 = 6
curr[1] = grid[2][1] + Math.min(prev[1], curr[0]) = 2 + Math.min(7, 6) = 2 + 6 = 8
curr[2] = grid[2][2] + Math.min(prev[2], curr[1]) = 1 + Math.min(6, 8) = 1 + 6 = 7
curr = [6, 8, 7]

RESULT: curr[2] = 7 (minimum path sum)
*/

/*
In-Place DP Approach:
Modifying the original grid directly

STEP 1: Original grid
grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]

STEP 2: Process first row (accumulate from left)
grid[0][0] = 1 (already correct)
grid[0][1] += grid[0][0] → 3 + 1 = 4
grid[0][2] += grid[0][1] → 1 + 4 = 5

grid = [
  [1, 4, 5],
  [1, 5, 1],
  [4, 2, 1]
]

STEP 3: Process first column (accumulate from top)
grid[1][0] += grid[0][0] → 1 + 1 = 2
grid[2][0] += grid[1][0] → 4 + 2 = 6

grid = [
  [1, 4, 5],
  [2, 5, 1],
  [6, 2, 1]
]

STEP 4: Process remaining cells
for i = 1 to 2:
  for j = 1 to 2:
    
    i = 1, j = 1:
    grid[1][1] += Math.min(grid[0][1], grid[1][0])
                = 5 + Math.min(4, 2) = 5 + 2 = 7
    
    i = 1, j = 2:
    grid[1][2] += Math.min(grid[0][2], grid[1][1])
                = 1 + Math.min(5, 7) = 1 + 5 = 6
    
    i = 2, j = 1:
    grid[2][1] += Math.min(grid[1][1], grid[2][0])
                = 2 + Math.min(7, 6) = 2 + 6 = 8
    
    i = 2, j = 2:
    grid[2][2] += Math.min(grid[1][2], grid[2][1])
                = 1 + Math.min(6, 8) = 1 + 6 = 7

Final modified grid:
grid = [
  [1, 4, 5],
  [2, 7, 6],
  [6, 8, 7]
]

RESULT: grid[2][2] = 7

Path reconstruction (backtracking from result):
Starting at (2,2) with value 7:
- Compare grid[1][2]=6 and grid[2][1]=8 → came from (1,2)
At (1,2) with value 6:
- Compare grid[0][2]=5 and grid[1][1]=7 → came from (0,2)
At (0,2) with value 5:
- Compare grid[0][1]=4 and out-of-bounds → came from (0,1)
At (0,1) with value 4:
- Compare grid[0][0]=1 and out-of-bounds → came from (0,0)

Optimal path: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Path values in original grid: 1 → 3 → 1 → 1 → 1 = 7
*/