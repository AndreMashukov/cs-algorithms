Problem: Unique Paths II (Recursive Memoization)

A1: b) Out of bounds, obstacle encountered, or destination reached
Explanation: The function has three base cases: returning 0 for out-of-bounds positions, returning 0 for obstacles, and returning 1 when reaching the destination cell.

A2: c) Return 0 immediately when obstacle is encountered
Explanation: When obstacleGrid[row][col] === 1, the function immediately returns 0, effectively blocking that path and preventing traversal through obstacles.

A3: b) Moving right and down
Explanation: The two recursive calls are uniquePathsHelper(row, col + 1) for moving right and uniquePathsHelper(row + 1, col) for moving down, which are the only two valid moves.

A4: b) Prevents recalculating same subproblems multiple times
Explanation: Memoization stores results using "row,col" keys, so each position is computed at most once, reducing time complexity from O(2^(m+n)) to O(m*n).

A5: c) Concatenation of row and column indices
Explanation: The memoization key is created as `${row},${col}`, which uniquely identifies each cell position in the grid.

A6: c) Function naturally returns 0 for obstacle at start
Explanation: If obstacleGrid[0][0] === 1, the first check in the recursive function returns 0, indicating no paths are possible from an obstacle starting position.

A7: b) Space complexity would improve but time complexity would worsen
Explanation: Without memoization, space would be O(m+n) for recursion stack only, but time complexity would become exponential O(2^(m+n)) due to overlapping subproblems being recalculated.