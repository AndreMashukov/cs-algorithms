/*
 * Unique Paths II - DP Example
 * https://leetcode.com/problems/unique-paths-ii/
 * 
 * Step-by-step trace of the Dynamic Programming Approach
 */

/*
Example Input:
obstacleGrid = [
  [0,0,0],
  [0,1,0],
  [0,0,0]
]

Grid visualization:
  0 1 2
0 S . .
1 . X .  (X = obstacle)
2 . . E

Goal: Find number of unique paths from S(0,0) to E(2,2)
Expected Output: 2 paths

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
if (obstacleGrid[0][0] === 0) dp[0][0] = 1
obstacleGrid[0][0] = 0 (no obstacle) ✓
dp = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

STEP 3: Initialize first row
for j = 1 to 2:
  j = 1: obstacleGrid[0][1] = 0 (no obstacle)
         dp[0][1] = dp[0][0] = 1
  j = 2: obstacleGrid[0][2] = 0 (no obstacle)
         dp[0][2] = dp[0][1] = 1

dp = [
  [1, 1, 1],
  [0, 0, 0],
  [0, 0, 0]
]

STEP 4: Initialize first column
for i = 1 to 2:
  i = 1: obstacleGrid[1][0] = 0 (no obstacle)
         dp[1][0] = dp[0][0] = 1
  i = 2: obstacleGrid[2][0] = 0 (no obstacle)
         dp[2][0] = dp[1][0] = 1

dp = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 0, 0]
]

STEP 5: Fill remaining cells
for i = 1 to 2:
  for j = 1 to 2:
    
    i = 1, j = 1:
    obstacleGrid[1][1] = 1 (OBSTACLE!)
    dp[1][1] = 0 (skip this cell)
    
    i = 1, j = 2:
    obstacleGrid[1][2] = 0 (no obstacle)
    dp[1][2] = dp[0][2] + dp[1][1] = 1 + 0 = 1
    
    i = 2, j = 1:
    obstacleGrid[2][1] = 0 (no obstacle)
    dp[2][1] = dp[1][1] + dp[2][0] = 0 + 1 = 1
    
    i = 2, j = 2:
    obstacleGrid[2][2] = 0 (no obstacle)
    dp[2][2] = dp[1][2] + dp[2][1] = 1 + 1 = 2

Final DP array:
dp = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 2]
]

RESULT: dp[2][2] = 2 unique paths
*/

/*
Space-Optimized DP Approach:
Using only O(n) space with two 1D arrays

STEP 1: Initialize previous row
prev = [0, 0, 0]

STEP 2: Process row 0
curr = [0, 0, 0]
j = 0: obstacleGrid[0][0] = 0, curr[0] = 1
j = 1: obstacleGrid[0][1] = 0, curr[1] = curr[0] + prev[1] = 1 + 0 = 1
j = 2: obstacleGrid[0][2] = 0, curr[2] = curr[1] + prev[2] = 1 + 0 = 1
curr = [1, 1, 1]
prev = curr = [1, 1, 1]

STEP 3: Process row 1
curr = [0, 0, 0]
j = 0: obstacleGrid[1][0] = 0, curr[0] = prev[0] = 1
j = 1: obstacleGrid[1][1] = 1 (OBSTACLE!), curr[1] = 0
j = 2: obstacleGrid[1][2] = 0, curr[2] = curr[1] + prev[2] = 0 + 1 = 1
curr = [1, 0, 1]
prev = curr = [1, 0, 1]

STEP 4: Process row 2
curr = [0, 0, 0]
j = 0: obstacleGrid[2][0] = 0, curr[0] = prev[0] = 1
j = 1: obstacleGrid[2][1] = 0, curr[1] = curr[0] + prev[1] = 1 + 0 = 1
j = 2: obstacleGrid[2][2] = 0, curr[2] = curr[1] + prev[2] = 1 + 1 = 2
curr = [1, 1, 2]

RESULT: curr[2] = 2 unique paths
*/

/*
In-Place DP Approach:
Modifying the original grid directly

STEP 1: Handle starting position
obstacleGrid[0][0] = 0 → convert to 1 (1 path to start)
obstacleGrid = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]

STEP 2: Process each cell
for i = 0 to 2:
  for j = 0 to 2:
    if (i === 0 && j === 0) continue; // already handled
    
    i = 0, j = 1:
    obstacleGrid[0][1] = 0 (no obstacle)
    left = obstacleGrid[0][0] = 1
    top = 0 (out of bounds)
    obstacleGrid[0][1] = left + top = 1 + 0 = 1
    
    i = 0, j = 2:
    obstacleGrid[0][2] = 0 (no obstacle)
    left = obstacleGrid[0][1] = 1
    top = 0 (out of bounds)
    obstacleGrid[0][2] = left + top = 1 + 0 = 1
    
    i = 1, j = 0:
    obstacleGrid[1][0] = 0 (no obstacle)
    left = 0 (out of bounds)
    top = obstacleGrid[0][0] = 1
    obstacleGrid[1][0] = left + top = 0 + 1 = 1
    
    i = 1, j = 1:
    obstacleGrid[1][1] = 1 (OBSTACLE!)
    Skip - remains 1 (acts as 0 in calculations)
    
    i = 1, j = 2:
    obstacleGrid[1][2] = 0 (no obstacle)
    left = obstacleGrid[1][1] = 1 (but this is obstacle, so treat as 0)
    top = obstacleGrid[0][2] = 1
    obstacleGrid[1][2] = 0 + 1 = 1  (obstacle cells contribute 0)
    
    i = 2, j = 0:
    obstacleGrid[2][0] = 0 (no obstacle)
    left = 0 (out of bounds)
    top = obstacleGrid[1][0] = 1
    obstacleGrid[2][0] = 0 + 1 = 1
    
    i = 2, j = 1:
    obstacleGrid[2][1] = 0 (no obstacle)
    left = obstacleGrid[2][0] = 1
    top = obstacleGrid[1][1] = 1 (but obstacle, so contributes 0)
    obstacleGrid[2][1] = 1 + 0 = 1
    
    i = 2, j = 2:
    obstacleGrid[2][2] = 0 (no obstacle)
    left = obstacleGrid[2][1] = 1
    top = obstacleGrid[1][2] = 1
    obstacleGrid[2][2] = 1 + 1 = 2

Final modified grid:
obstacleGrid = [
  [1, 1, 1],
  [1, 1, 1],  // Note: obstacle at [1][1] remains 1 but contributes 0 to sums
  [1, 1, 2]
]

RESULT: obstacleGrid[2][2] = 2 unique paths

Note: In the in-place approach, obstacle cells remain as 1 but when used in 
calculations, they're treated as contributing 0 paths.
*/