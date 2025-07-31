Problem: Minimum Path Sum (Space-Optimized DP)

Q1: In the `minPathSumOptimized` solution, what is the purpose of the 1D `dp` array?
1. To store the entire grid for easier access.
2. To store the cumulative path sums for only the current row being processed.
3. To store the minimum path sum for each column from the starting point.
4. To track the path taken by the robot.

Q2: How is the first element, `dp[0]`, handled for each row `i` after the first row?
1. It is reset to `grid[i][0]` at the start of each row's loop.
2. It is updated by adding the current `grid[i][0]` to its previous value.
3. It is set to the minimum of the entire previous row.
4. It remains constant after being initialized with `grid[0][0]`.

Q3: For a cell `(i, j)` where `i > 0` and `j > 0`, what is the correct update formula for `dp[j]`?
1. `dp[j] = grid[i][j] + dp[j-1]`
2. `dp[j] = grid[i][j] + dp[j]`
3. `dp[j] = grid[i][j] + Math.min(dp[j], dp[j-1])`
4. `dp[j] = grid[i][j]`

Q4: When the inner loop updates `dp[j]`, what does its previous value (before the update) represent?
1. The minimum path sum to the cell to the left, `(i, j-1)`.
2. The minimum path sum to the cell directly above, `(i-1, j)`.
3. The value of `grid[i-1][j]`.
4. The total sum of the current row up to `j`.

Q5: Why is this space-optimized approach correct?
1. Because the path can only go down, so we don't need information from the left.
2. Because all grid values are positive, preventing negative path sums.
3. Because calculating the path sum for any cell only requires knowing the sums from the cell directly above and the cell immediately to the left.
4. Because the grid is always rectangular.

Q6: Given the grid `[[1, 5], [2, 1]]`, what is the value of `dp[1]` after the loop for the first row (`i=0`) completes?
1. 5
2. 6
3. 1
4. 2

Q7: Continuing with the grid `[[1, 5], [2, 1]]`, what is the value of `dp[1]` after the loop for the second row (`i=1`) completes?
1. 3
2. 4
3. 7
4. 5

Q8: After the loops complete, where is the final result located?
1. In `dp[0]`.
2. In `dp[n-1]`, where `n` is the number of columns.
3. In `dp[m-1]`, where `m` is the number of rows.
4. The function must return the minimum value in the final `dp` array.
