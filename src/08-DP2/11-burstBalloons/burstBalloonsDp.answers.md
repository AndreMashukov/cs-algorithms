# Burst Balloons (Bottom-Up DP) - Answers

## Q1: 2
`dp[l][r]` stores the maximum coins you can get from bursting all the balloons in the original `nums` array from index `l-1` to `r-1`. The indices `l` and `r` are 1-based and correspond to the `dp` table dimensions.

## Q2: 2
The DP calculation for `dp[l][r]` depends on the results of subproblems that correspond to smaller ranges of balloons. The chosen loop order iterates through subarray lengths, starting from the smallest (length 1) and going up to `n`. `l` moving from `n` down to 1 and `r` moving from `l` to `n` effectively controls the length `r-l+1`. This ensures that when `dp[l][r]` is being calculated, the required values `dp[l][i-1]` and `dp[i+1][r]` (which correspond to smaller sub-arrays) are already computed and available in the table.

## Q3: 2
The variable `i` iterates through each balloon in the current subarray `nums[l...r]`. For each `i`, the code calculates the potential maximum coins assuming that balloon `i` is the very last one to be burst within that specific subarray.

## Q4: 3
This line implements the core DP recurrence relation. If balloon `i` is the last to be burst in the `[l, r]` range, the total coins will be the sum of:
1. Coins from bursting `i` last (`newNums[l-1] * newNums[i] * newNums[r+1]`).
2. Max coins from the subproblem to the left of `i` (`dp[l][i-1]`).
3. Max coins from the subproblem to the right of `i` (`dp[i+1][r]`).
This line adds the already-computed optimal results from the subproblems.

## Q5: 3
The final answer for bursting all balloons from the original array (`nums[0...n-1]`) is stored in `dp[1][n]`. This state represents the subproblem covering the entire range of original balloons.

## Q6: 3
The solution uses three nested loops. The outer two loops (`l` and `r`) define the O(n^2) subproblems. The innermost loop (`i`) iterates up to `n` times for each subproblem to find the optimal split point. This results in a time complexity of O(n^3).

## Q7: 2
The space complexity is determined by the DP table, which has dimensions of `(n+2) x (n+2)`. Therefore, the space required is O(n^2).

## Q8: 1
For a given range `[l, r]`, there are multiple choices for which balloon to burst last. The loop over `i` calculates the total coins for each choice. The `Math.max` function ensures that `dp[l][r]` is updated with the highest coin value found among all possible choices for `i`, thus storing the optimal solution for that subproblem.

## Q9: 2
`dp[1][1]` corresponds to the subproblem of bursting the first balloon, `nums[0]`, which is `3`. The `newNums` array is `[1, 3, 1, 5, 8, 1]`. For `l=1, r=1, i=1`, the coins are `newNums[l-1] * newNums[i] * newNums[r+1]`, which is `newNums[0] * newNums[1] * newNums[2]` or `1 * 3 * 1 = 3`. The other terms `dp[1][0]` and `dp[2][1]` are 0.

## Q10: 2
This DP solution is the iterative, bottom-up equivalent of the recursive, top-down DFS with memoization. Both solve the same subproblems and use the same recurrence relation. The `dp` table in this solution serves the same purpose as the `map` in the DFS solution: to store the results of subproblems to avoid re-computation. The DP approach builds the solution from the smallest subproblems up, while the DFS approach starts from the top and recursively breaks the problem down.
