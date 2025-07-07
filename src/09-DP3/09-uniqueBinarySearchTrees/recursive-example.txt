Problem: Unique Binary Search Trees (Recursive with Memoization)

Let's trace through numTrees_dfs(3) step by step:

Step 1: Initial call dfs(3)
- Check memo: not found
- count = 3 > 1, so continue to main logic
- Initialize totalTrees = 0

Step 2: Try root = 1
- leftSubtreeNodes = 1 - 1 = 0
- rightSubtreeNodes = 3 - 1 = 2
- Call dfs(0): returns 1 (base case)
- Call dfs(2): need to compute

Step 3: Compute dfs(2)
- Check memo: not found
- count = 2 > 1, so continue
- Initialize totalTrees = 0

Step 4: Inside dfs(2), try root = 1
- leftSubtreeNodes = 0, rightSubtreeNodes = 1
- dfs(0) = 1, dfs(1) = 1
- totalTrees += 1 * 1 = 1

Step 5: Inside dfs(2), try root = 2
- leftSubtreeNodes = 1, rightSubtreeNodes = 0
- dfs(1) = 1, dfs(0) = 1
- totalTrees += 1 * 1 = 2

Step 6: dfs(2) complete
- memo[2] = 2, return 2

Step 7: Back to dfs(3), root = 1
- leftSubtrees = 1, rightSubtrees = 2
- totalTrees += 1 * 2 = 2

Step 8: Try root = 2
- leftSubtreeNodes = 1, rightSubtreeNodes = 1
- dfs(1) = 1, dfs(1) = 1
- totalTrees += 1 * 1 = 3

Step 9: Try root = 3
- leftSubtreeNodes = 2, rightSubtreeNodes = 0
- dfs(2) = 2 (from memo), dfs(0) = 1
- totalTrees += 2 * 1 = 5

Step 10: Final result
- memo[3] = 5, return 5

Final Result: 5 unique BSTs can be formed with 3 nodes