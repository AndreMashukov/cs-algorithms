/*
 * Minimum Path Sum - Recursive Example
 * https://leetcode.com/problems/minimum-path-sum/
 * 
 * Step-by-step trace of the Recursive Memoization Approach
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
Expected Output: 7 (path: 1→3→1→1→1)

Recursive Function Call Trace:
*/

/*
STEP 1: Initial call minPathSum([[1,3,1],[1,5,1],[4,2,1]])
- m = 3, n = 3
- memo = new Map()
- Call minPathSumHelper(0, 0, grid, memo)

STEP 2: minPathSumHelper(0, 0, grid, memo)
- Check bounds: 0 < 3 && 0 < 3 ✓
- Check destination: 0 !== 2 || 0 !== 2 ✗
- Check memo: key "0,0" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(0, 1, grid, memo)
  * downPath = minPathSumHelper(1, 0, grid, memo)

STEP 3: minPathSumHelper(0, 1, grid, memo)
- Check bounds: 0 < 3 && 1 < 3 ✓
- Check destination: 0 !== 2 || 1 !== 2 ✗
- Check memo: key "0,1" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(0, 2, grid, memo)
  * downPath = minPathSumHelper(1, 1, grid, memo)

STEP 4: minPathSumHelper(0, 2, grid, memo)
- Check bounds: 0 < 3 && 2 < 3 ✓
- Check destination: 0 !== 2 || 2 !== 2 ✗
- Check memo: key "0,2" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(0, 3, grid, memo)
  * downPath = minPathSumHelper(1, 2, grid, memo)

STEP 5: minPathSumHelper(0, 3, grid, memo)
- Check bounds: 0 < 3 && 3 < 3 ✗ (out of bounds)
- Return Infinity

STEP 6: minPathSumHelper(1, 2, grid, memo)
- Check bounds: 1 < 3 && 2 < 3 ✓
- Check destination: 1 !== 2 || 2 !== 2 ✗
- Check memo: key "1,2" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(1, 3, grid, memo)
  * downPath = minPathSumHelper(2, 2, grid, memo)

STEP 7: minPathSumHelper(1, 3, grid, memo)
- Check bounds: 1 < 3 && 3 < 3 ✗ (out of bounds)
- Return Infinity

STEP 8: minPathSumHelper(2, 2, grid, memo)
- Check bounds: 2 < 3 && 2 < 3 ✓
- Check destination: 2 === 2 && 2 === 2 ✓ (reached destination!)
- Return grid[2][2] = 1

STEP 9: Back to minPathSumHelper(1, 2, grid, memo)
- rightPath = Infinity (from step 7)
- downPath = 1 (from step 8)
- result = grid[1][2] + Math.min(Infinity, 1) = 1 + 1 = 2
- memo.set("1,2", 2)
- Return 2

STEP 10: Back to minPathSumHelper(0, 2, grid, memo)
- rightPath = Infinity (from step 5)
- downPath = 2 (from step 9)
- result = grid[0][2] + Math.min(Infinity, 2) = 1 + 2 = 3
- memo.set("0,2", 3)
- Return 3

STEP 11: minPathSumHelper(1, 1, grid, memo)
- Check bounds: 1 < 3 && 1 < 3 ✓
- Check destination: 1 !== 2 || 1 !== 2 ✗
- Check memo: key "1,1" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(1, 2, grid, memo)
  * downPath = minPathSumHelper(2, 1, grid, memo)

STEP 12: minPathSumHelper(1, 2, grid, memo) [MEMOIZED]
- Check memo: key "1,2" found → return 2

STEP 13: minPathSumHelper(2, 1, grid, memo)
- Check bounds: 2 < 3 && 1 < 3 ✓
- Check destination: 2 !== 2 || 1 !== 2 ✗
- Check memo: key "2,1" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(2, 2, grid, memo)
  * downPath = minPathSumHelper(3, 1, grid, memo)

STEP 14: minPathSumHelper(2, 2, grid, memo) [DESTINATION]
- Already computed: return 1

STEP 15: minPathSumHelper(3, 1, grid, memo)
- Check bounds: 3 < 3 ✗ (out of bounds)
- Return Infinity

STEP 16: Back to minPathSumHelper(2, 1, grid, memo)
- rightPath = 1 (from step 14)
- downPath = Infinity (from step 15)
- result = grid[2][1] + Math.min(1, Infinity) = 2 + 1 = 3
- memo.set("2,1", 3)
- Return 3

STEP 17: Back to minPathSumHelper(1, 1, grid, memo)
- rightPath = 2 (from step 12, memoized)
- downPath = 3 (from step 16)
- result = grid[1][1] + Math.min(2, 3) = 5 + 2 = 7
- memo.set("1,1", 7)
- Return 7

STEP 18: Back to minPathSumHelper(0, 1, grid, memo)
- rightPath = 3 (from step 10)
- downPath = 7 (from step 17)
- result = grid[0][1] + Math.min(3, 7) = 3 + 3 = 6
- memo.set("0,1", 6)
- Return 6

STEP 19: minPathSumHelper(1, 0, grid, memo)
- Check bounds: 1 < 3 && 0 < 3 ✓
- Check destination: 1 !== 2 || 0 !== 2 ✗
- Check memo: key "1,0" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(1, 1, grid, memo)
  * downPath = minPathSumHelper(2, 0, grid, memo)

STEP 20: minPathSumHelper(1, 1, grid, memo) [MEMOIZED]
- Check memo: key "1,1" found → return 7

STEP 21: minPathSumHelper(2, 0, grid, memo)
- Check bounds: 2 < 3 && 0 < 3 ✓
- Check destination: 2 !== 2 || 0 !== 2 ✗
- Check memo: key "2,0" not found
- Make recursive calls:
  * rightPath = minPathSumHelper(2, 1, grid, memo)
  * downPath = minPathSumHelper(3, 0, grid, memo)

STEP 22: minPathSumHelper(2, 1, grid, memo) [MEMOIZED]
- Check memo: key "2,1" found → return 3

STEP 23: minPathSumHelper(3, 0, grid, memo)
- Check bounds: 3 < 3 ✗ (out of bounds)
- Return Infinity

STEP 24: Back to minPathSumHelper(2, 0, grid, memo)
- rightPath = 3 (from step 22, memoized)
- downPath = Infinity (from step 23)
- result = grid[2][0] + Math.min(3, Infinity) = 4 + 3 = 7
- memo.set("2,0", 7)
- Return 7

STEP 25: Back to minPathSumHelper(1, 0, grid, memo)
- rightPath = 7 (from step 20, memoized)
- downPath = 7 (from step 24)
- result = grid[1][0] + Math.min(7, 7) = 1 + 7 = 8
- memo.set("1,0", 8)
- Return 8

STEP 26: Back to minPathSumHelper(0, 0, grid, memo)
- rightPath = 6 (from step 18)
- downPath = 8 (from step 25)
- result = grid[0][0] + Math.min(6, 8) = 1 + 6 = 7
- memo.set("0,0", 7)
- Return 7

FINAL RESULT: 7

Optimal path found: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Path values: 1 → 3 → 1 → 1 → 1 = 7

Memo table final state:
"0,0": 7, "0,1": 6, "0,2": 3, "1,0": 8, "1,1": 7, "1,2": 2, "2,0": 7, "2,1": 3, "2,2": 1

Note: Multiple cells were reused due to memoization, significantly reducing computation time.
*/