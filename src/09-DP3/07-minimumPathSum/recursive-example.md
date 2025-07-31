Problem: Minimum Path Sum (Recursive Memoization Example)

Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Goal: Find minimum path sum from top-left to bottom-right

Grid visualization:
  0 1 2
0 1 3 1
1 1 5 1
2 4 2 1

Expected Output: 7 (optimal path: 1→3→1→1→1)

Recursive Memoization - Step-by-Step:

1. Initial call: minPathSumHelper(0, 0, grid, memo)
   - Not destination (0,0) ≠ (2,2)
   - Make recursive calls for right and down

2. Explore right path: minPathSumHelper(0, 1, grid, memo)
   - Not destination, continue recursion
   - rightPath = minPathSumHelper(0, 2, grid, memo)
   - downPath = minPathSumHelper(1, 1, grid, memo)

3. Process (0,2):
   - rightPath: (0,3) out of bounds → return Infinity
   - downPath: minPathSumHelper(1, 2, grid, memo)

4. Process (1,2):
   - rightPath: (1,3) out of bounds → return Infinity
   - downPath: minPathSumHelper(2, 2, grid, memo) → DESTINATION!
   - Return grid[2][2] = 1

5. Back to (1,2):
   - result = grid[1][2] + min(Infinity, 1) = 1 + 1 = 2
   - memo["1,2"] = 2

6. Back to (0,2):
   - result = grid[0][2] + min(Infinity, 2) = 1 + 2 = 3
   - memo["0,2"] = 3

7. Process (1,1) from (0,1):
   - rightPath: minPathSumHelper(1, 2, grid, memo) → memo hit! → return 2
   - downPath: minPathSumHelper(2, 1, grid, memo)

8. Process (2,1):
   - rightPath: minPathSumHelper(2, 2, grid, memo) → destination → return 1
   - downPath: (3,1) out of bounds → return Infinity
   - result = grid[2][1] + min(1, Infinity) = 2 + 1 = 3
   - memo["2,1"] = 3

9. Back to (1,1):
   - result = grid[1][1] + min(2, 3) = 5 + 2 = 7
   - memo["1,1"] = 7

10. Back to (0,1):
    - result = grid[0][1] + min(3, 7) = 3 + 3 = 6
    - memo["0,1"] = 6

11. Explore down path from (0,0): minPathSumHelper(1, 0, grid, memo)
    - rightPath: minPathSumHelper(1, 1, grid, memo) → memo hit! → return 7
    - downPath: minPathSumHelper(2, 0, grid, memo)

12. Process (2,0):
    - rightPath: minPathSumHelper(2, 1, grid, memo) → memo hit! → return 3
    - downPath: (3,0) out of bounds → return Infinity
    - result = grid[2][0] + min(3, Infinity) = 4 + 3 = 7
    - memo["2,0"] = 7

13. Back to (1,0):
    - result = grid[1][0] + min(7, 7) = 1 + 7 = 8
    - memo["1,0"] = 8

14. Final result at (0,0):
    - rightPath = 6, downPath = 8
    - result = grid[0][0] + min(6, 8) = 1 + 6 = 7

Memo table final state:
"0,0": 7, "0,1": 6, "0,2": 3, "1,0": 8, "1,1": 7, "1,2": 2, "2,0": 7, "2,1": 3

Output: 7

Optimal path: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Path values: 1 + 3 + 1 + 1 + 1 = 7

Key Insights:
- Memoization prevents recalculating same positions
- Infinity for out-of-bounds ensures invalid paths are ignored
- Each cell chooses minimum of right/down paths plus its own value