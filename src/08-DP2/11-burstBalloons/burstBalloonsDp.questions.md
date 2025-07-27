# Burst Balloons (Bottom-Up DP) - Questions

## Q1: In the DP solution, what does the state `dp[l][r]` represent?
1. The maximum coins from bursting the balloon at index `l` and the balloon at index `r`.
2. The maximum coins obtained from bursting all balloons in the subarray `nums[l...r]` (inclusive, using original `nums` indexing).
3. The number of balloons between `l` and `r`.
4. The coins obtained by bursting balloon `l` first, then balloon `r`.

## Q2: The loops are structured as `for (let l = n; l >= 1; l--)` and `for (let r = l; r <= n; r++)`. Why is this specific order necessary?
1. It's an arbitrary choice; iterating from `l=1` to `n` would also work.
2. This order ensures that when we calculate `dp[l][r]`, the values for smaller subproblems (like `dp[l][i-1]` and `dp[i+1][r]`) have already been computed.
3. It optimizes cache performance by accessing memory sequentially.
4. This order processes the balloons from right to left.

## Q3: What is the role of the innermost loop variable `i` (from `l` to `r`)?
1. It represents the number of coins to add.
2. It iterates through all possible balloons that could be the *last* one to burst within the subarray `nums[l...r]`.
3. It is the index of the current balloon being considered for the `newNums` array.
4. It tracks the length of the subarray being considered.

## Q4: What does the line `coins += dp[l][i - 1] + dp[i + 1][r]` achieve?
1. It adds the coins from the left and right neighbor balloons.
2. It calculates the total number of balloons burst so far.
3. It looks up and adds the pre-computed maximum coins from the subproblems to the left and right of balloon `i`.
4. It recursively calls the function for subproblems.

## Q5: Where is the final answer located after the DP table is fully populated?
1. `dp[0][n+1]`
2. `dp[n][n]`
3. `dp[1][n]`
4. The maximum value in the entire `dp` table.

## Q6: What is the time complexity of this bottom-up DP solution?
1. O(n^2)
2. O(n log n)
3. O(n^3)
4. O(2^n)

## Q7: What is the space complexity of this DP solution?
1. O(n)
2. O(n^2)
3. O(1)
4. O(n^3)

## Q8: How does the DP state transition `dp[l][r] = Math.max(dp[l][r], coins)` relate to the problem's goal?
1. It ensures that for the subproblem `nums[l...r]`, we are always storing the maximum possible coins by trying every possible "last balloon to burst" (`i`).
2. It compares the coins from bursting `l` last versus bursting `r` last.
3. It finds the maximum value in the current row of the DP table.
4. It transitions from the previous state `dp[l-1][r-1]`.

## Q9: If `nums` is `[3, 1, 5, 8]`, what does `dp[1][1]` represent and what is its value?
1. It represents bursting `[3,1]`, value is `3*1*5=15`.
2. It represents bursting the sub-array `[3]`, value is `1*3*1=3`.
3. It represents bursting `[8]`, value is `5*8*1=40`.
4. It represents an empty array, value is `0`.

## Q10: How does this bottom-up DP approach relate to the top-down DFS with memoization approach?
1. They are completely different and unrelated algorithms.
2. The DP approach is an iterative version of the recursive DFS. The `dp[l][r]` table stores the same values that the `dfs(l, r)` function would compute and memoize.
3. The DP approach is less efficient but easier to write.
4. The DFS approach solves for smaller subproblems first, while the DP approach solves for larger ones first.
