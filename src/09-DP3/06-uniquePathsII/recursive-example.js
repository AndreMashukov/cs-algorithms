/*
 * Unique Paths II - Recursive Example
 * https://leetcode.com/problems/unique-paths-ii/
 * 
 * Step-by-step trace of the Recursive Memoization Approach
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

Recursive Function Call Trace:
*/

/*
STEP 1: Initial call uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])
- m = 3, n = 3
- memo = new Map()
- Call uniquePathsHelper(0, 0, obstacleGrid, memo)

STEP 2: uniquePathsHelper(0, 0, obstacleGrid, memo)
- Check bounds: 0 < 3 && 0 < 3 ✓
- Check obstacle: obstacleGrid[0][0] = 0 (no obstacle) ✓
- Check destination: 0 !== 2 || 0 !== 2 ✗
- Check memo: key "0,0" not found
- Make recursive calls:
  * rightPaths = uniquePathsHelper(0, 1, obstacleGrid, memo)
  * downPaths = uniquePathsHelper(1, 0, obstacleGrid, memo)

STEP 3: uniquePathsHelper(0, 1, obstacleGrid, memo)
- Check bounds: 0 < 3 && 1 < 3 ✓
- Check obstacle: obstacleGrid[0][1] = 0 (no obstacle) ✓
- Check destination: 0 !== 2 || 1 !== 2 ✗
- Check memo: key "0,1" not found
- Make recursive calls:
  * rightPaths = uniquePathsHelper(0, 2, obstacleGrid, memo)
  * downPaths = uniquePathsHelper(1, 1, obstacleGrid, memo)

STEP 4: uniquePathsHelper(0, 2, obstacleGrid, memo)
- Check bounds: 0 < 3 && 2 < 3 ✓
- Check obstacle: obstacleGrid[0][2] = 0 (no obstacle) ✓
- Check destination: 0 !== 2 || 2 !== 2 ✗
- Check memo: key "0,2" not found
- Make recursive calls:
  * rightPaths = uniquePathsHelper(0, 3, obstacleGrid, memo)
  * downPaths = uniquePathsHelper(1, 2, obstacleGrid, memo)

STEP 5: uniquePathsHelper(0, 3, obstacleGrid, memo)
- Check bounds: 0 < 3 && 3 < 3 ✗ (out of bounds)
- Return 0

STEP 6: uniquePathsHelper(1, 2, obstacleGrid, memo)
- Check bounds: 1 < 3 && 2 < 3 ✓
- Check obstacle: obstacleGrid[1][2] = 0 (no obstacle) ✓
- Check destination: 1 !== 2 || 2 !== 2 ✗
- Check memo: key "1,2" not found
- Make recursive calls:
  * rightPaths = uniquePathsHelper(1, 3, obstacleGrid, memo)
  * downPaths = uniquePathsHelper(2, 2, obstacleGrid, memo)

STEP 7: uniquePathsHelper(1, 3, obstacleGrid, memo)
- Check bounds: 1 < 3 && 3 < 3 ✗ (out of bounds)
- Return 0

STEP 8: uniquePathsHelper(2, 2, obstacleGrid, memo)
- Check bounds: 2 < 3 && 2 < 3 ✓
- Check obstacle: obstacleGrid[2][2] = 0 (no obstacle) ✓
- Check destination: 2 === 2 && 2 === 2 ✓ (reached destination!)
- Return 1

STEP 9: Back to uniquePathsHelper(1, 2, obstacleGrid, memo)
- rightPaths = 0 (from step 7)
- downPaths = 1 (from step 8)
- result = 0 + 1 = 1
- memo.set("1,2", 1)
- Return 1

STEP 10: Back to uniquePathsHelper(0, 2, obstacleGrid, memo)
- rightPaths = 0 (from step 5)
- downPaths = 1 (from step 9)
- result = 0 + 1 = 1
- memo.set("0,2", 1)
- Return 1

STEP 11: uniquePathsHelper(1, 1, obstacleGrid, memo)
- Check bounds: 1 < 3 && 1 < 3 ✓
- Check obstacle: obstacleGrid[1][1] = 1 (OBSTACLE!) ✗
- Return 0 (blocked by obstacle)

STEP 12: Back to uniquePathsHelper(0, 1, obstacleGrid, memo)
- rightPaths = 1 (from step 10)
- downPaths = 0 (from step 11, blocked by obstacle)
- result = 1 + 0 = 1
- memo.set("0,1", 1)
- Return 1

STEP 13: uniquePathsHelper(1, 0, obstacleGrid, memo)
- Check bounds: 1 < 3 && 0 < 3 ✓
- Check obstacle: obstacleGrid[1][0] = 0 (no obstacle) ✓
- Check destination: 1 !== 2 || 0 !== 2 ✗
- Check memo: key "1,0" not found
- Make recursive calls:
  * rightPaths = uniquePathsHelper(1, 1, obstacleGrid, memo)
  * downPaths = uniquePathsHelper(2, 0, obstacleGrid, memo)

STEP 14: uniquePathsHelper(1, 1, obstacleGrid, memo) [ALREADY COMPUTED]
- Check memo: key "1,1" not in memo but we know it hits obstacle
- Return 0 (blocked by obstacle)

STEP 15: uniquePathsHelper(2, 0, obstacleGrid, memo)
- Check bounds: 2 < 3 && 0 < 3 ✓
- Check obstacle: obstacleGrid[2][0] = 0 (no obstacle) ✓
- Check destination: 2 !== 2 || 0 !== 2 ✗
- Check memo: key "2,0" not found
- Make recursive calls:
  * rightPaths = uniquePathsHelper(2, 1, obstacleGrid, memo)
  * downPaths = uniquePathsHelper(3, 0, obstacleGrid, memo)

STEP 16: uniquePathsHelper(2, 1, obstacleGrid, memo)
- Check bounds: 2 < 3 && 1 < 3 ✓
- Check obstacle: obstacleGrid[2][1] = 0 (no obstacle) ✓
- Check destination: 2 !== 2 || 1 !== 2 ✗
- Check memo: key "2,1" not found
- Make recursive calls:
  * rightPaths = uniquePathsHelper(2, 2, obstacleGrid, memo)
  * downPaths = uniquePathsHelper(3, 1, obstacleGrid, memo)

STEP 17: uniquePathsHelper(2, 2, obstacleGrid, memo) [DESTINATION]
- Return 1 (already computed in step 8)

STEP 18: uniquePathsHelper(3, 1, obstacleGrid, memo)
- Check bounds: 3 < 3 ✗ (out of bounds)
- Return 0

STEP 19: Back to uniquePathsHelper(2, 1, obstacleGrid, memo)
- rightPaths = 1 (from step 17)
- downPaths = 0 (from step 18)
- result = 1 + 0 = 1
- memo.set("2,1", 1)
- Return 1

STEP 20: uniquePathsHelper(3, 0, obstacleGrid, memo)
- Check bounds: 3 < 3 ✗ (out of bounds)
- Return 0

STEP 21: Back to uniquePathsHelper(2, 0, obstacleGrid, memo)
- rightPaths = 1 (from step 19)
- downPaths = 0 (from step 20)
- result = 1 + 0 = 1
- memo.set("2,0", 1)
- Return 1

STEP 22: Back to uniquePathsHelper(1, 0, obstacleGrid, memo)
- rightPaths = 0 (from step 14, blocked by obstacle)
- downPaths = 1 (from step 21)
- result = 0 + 1 = 1
- memo.set("1,0", 1)
- Return 1

STEP 23: Back to uniquePathsHelper(0, 0, obstacleGrid, memo)
- rightPaths = 1 (from step 12)
- downPaths = 1 (from step 22)
- result = 1 + 1 = 2
- memo.set("0,0", 2)
- Return 2

FINAL RESULT: 2 unique paths found!

Two valid paths:
Path 1: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Path 2: (0,0) → (1,0) → (2,0) → (2,1) → (2,2)

Note: The path through (1,1) is blocked by the obstacle.
*/