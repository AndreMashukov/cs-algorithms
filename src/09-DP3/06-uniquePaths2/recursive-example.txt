Problem: Unique Paths II (Recursive Memoization Example)

Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Goal: Find number of unique paths from top-left to bottom-right

Grid visualization:
  0 1 2
0 S . .
1 . X .  (X = obstacle)
2 . . E

Expected Output: 2 paths

Recursive Memoization - Step-by-Step:

1. Initial call: uniquePathsHelper(0, 0, grid, memo)
   - Check bounds: 0 < 3 && 0 < 3 ✓
   - Check obstacle: grid[0][0] = 0 (no obstacle) ✓
   - Not destination: continue recursion

2. Make recursive calls from (0,0):
   - rightPath = uniquePathsHelper(0, 1, grid, memo)
   - downPath = uniquePathsHelper(1, 0, grid, memo)

3. Process rightPath call (0,1):
   - No obstacle at (0,1)
   - rightPath from (0,1) = uniquePathsHelper(0, 2, grid, memo)
   - downPath from (0,1) = uniquePathsHelper(1, 1, grid, memo)

4. Process (0,2):
   - rightPath: out of bounds → return 0
   - downPath: uniquePathsHelper(1, 2, grid, memo)

5. Process (1,2):
   - rightPath: out of bounds → return 0
   - downPath: uniquePathsHelper(2, 2, grid, memo) → destination → return 1
   - Result at (1,2): 0 + 1 = 1, memo["1,2"] = 1

6. Back to (0,2):
   - Result: 0 + 1 = 1, memo["0,2"] = 1

7. Process (1,1) from (0,1):
   - grid[1][1] = 1 (OBSTACLE!) → return 0 immediately

8. Back to (0,1):
   - Result: 1 + 0 = 1, memo["0,1"] = 1

9. Process downPath from (0,0): uniquePathsHelper(1, 0, grid, memo)
   - No obstacle at (1,0)
   - rightPath: (1,1) → obstacle → return 0
   - downPath: uniquePathsHelper(2, 0, grid, memo)

10. Process (2,0):
    - rightPath: uniquePathsHelper(2, 1, grid, memo)
    - downPath: out of bounds → return 0

11. Process (2,1):
    - rightPath: uniquePathsHelper(2, 2, grid, memo) → destination → return 1
    - downPath: out of bounds → return 0
    - Result at (2,1): 1 + 0 = 1, memo["2,1"] = 1

12. Back to (2,0):
    - Result: 1 + 0 = 1, memo["2,0"] = 1

13. Back to (1,0):
    - Result: 0 + 1 = 1, memo["1,0"] = 1

14. Final result at (0,0):
    - rightPath = 1, downPath = 1
    - Total paths: 1 + 1 = 2

Memo table final state:
"0,0": 2, "0,1": 1, "0,2": 1, "1,0": 1, "1,2": 1, "2,0": 1, "2,1": 1

Two valid paths found:
Path 1: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Path 2: (0,0) → (1,0) → (2,0) → (2,1) → (2,2)

Note: Path through (1,1) is blocked by obstacle.