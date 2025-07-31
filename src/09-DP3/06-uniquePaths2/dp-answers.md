Problem: Unique Paths II (Space-Optimized Dynamic Programming)

A1: b) To reduce space complexity from O(m*n) to O(n)
Explanation: The space-optimized solution uses a single 1D array of size n instead of a 2D array of size m*n, significantly reducing memory usage while maintaining correctness.

A2: b) All elements set to 0, with dp[0] = 1
Explanation: The DP array is initialized with zeros using Array(n).fill(0), then dp[0] is set to 1 to represent one way to reach the starting position (if it's not an obstacle).

A3: b) Number of paths from the cell above
Explanation: Before updating dp[j] in each iteration, its value represents the number of paths from the cell above in the previous row, since we reuse the same array across rows.

A4: b) It's set to 0
Explanation: When an obstacle is encountered (obstacleGrid[i][j] === 1), dp[j] is set to 0 because no paths can go through an obstacle cell.

A5: c) dp[j] = dp[j] + dp[j-1]
Explanation: For non-obstacle cells after the first column, we add paths from the left (dp[j-1]) to paths from above (current dp[j]) to get total possible paths to this cell.

A6: b) It can only be reached from above
Explanation: The first column cells (j=0) can only be reached by moving downward from cells above them, so we only need to preserve the existing dp[j] value (or set to 0 if obstacle).

A7: b) O(m * n)
Explanation: Despite using O(n) space, we still need to process each cell in the grid once, requiring m*n operations for an m×n grid.

A8: b) To prevent an out-of-bounds array access for `dp[j-1]` when processing the first column (j=0).
Explanation: When j is 0, `dp[j-1]` would attempt to access `dp[-1]`, which is an invalid index. The condition ensures that the logic for adding paths from the left is only applied to columns other than the very first one.

A9: b) `dp[j]` is the path count from the cell above, and `dp[j-1]` is the path count from the cell to the left.
Explanation: The 1D `dp` array carries over the values from the previous row. So, at the start of the `j` loop for a given `i`, `dp[j]` holds the path count from `(i-1, j)`. `dp[j-1]` has already been updated in the current `i` iteration to reflect the path count for `(i, j-1)`.