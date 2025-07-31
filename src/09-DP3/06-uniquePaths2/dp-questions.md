Problem: Unique Paths II (Space-Optimized Dynamic Programming)

Q1: In the space-optimized solution uniquePathsWithObstaclesOptimized, what is the purpose of using a 1D DP array?
a) To increase time complexity
b) To reduce space complexity from O(m*n) to O(n)
c) To make the code more readable
d) To handle more edge cases

Q2: How is the 1D DP array initialized in uniquePathsWithObstaclesOptimized?
a) All elements set to 1
b) All elements set to 0, with dp[0] = 1
c) Random initialization
d) Copy from first row of obstacleGrid

Q3: In the inner loop of uniquePathsWithObstaclesOptimized, what does dp[j] represent before updating?
a) Number of paths from the start
b) Number of paths from the cell above
c) Number of paths from the left
d) Total obstacles encountered

Q4: What happens to dp[j] when an obstacle is encountered in uniquePathsWithObstaclesOptimized?
a) It's incremented by 1
b) It's set to 0
c) It keeps its previous value
d) It's set to infinity

Q5: For non-obstacle cells (except first column), how is dp[j] updated?
a) dp[j] = dp[j-1]
b) dp[j] = dp[j] + 1
c) dp[j] = dp[j] + dp[j-1]
d) dp[j] = max(dp[j], dp[j-1])

Q6: Why doesn't the first column (j=0) need the dp[j-1] term in its update?
a) It's always unreachable
b) It can only be reached from above
c) It's always an obstacle
d) It's always 1

Q7: What is the time complexity of uniquePathsWithObstaclesOptimized?
a) O(m + n)
b) O(m * n)
c) O(n)
d) O(1)

Q8: Why is the `else if (j > 0)` condition crucial in the inner loop of `uniquePathsWithObstaclesOptimized`?
a) To ensure the first row is processed correctly.
b) To prevent an out-of-bounds array access for `dp[j-1]` when processing the first column (j=0).
c) To skip processing for cells that contain obstacles.
d) To handle the final cell at the bottom-right corner differently.

Q9: Inside the `else if (j > 0)` block, what do `dp[j]` and `dp[j-1]` represent right before the line `dp[j] = dp[j] + dp[j-1]` is executed?
a) `dp[j]` is 0 and `dp[j-1]` is 1.
b) `dp[j]` is the path count from the cell above, and `dp[j-1]` is the path count from the cell to the left.
c) `dp[j]` is the path count from the cell to the left, and `dp[j-1]` is the path count from the cell above.
d) Both represent the path counts from the previous row.