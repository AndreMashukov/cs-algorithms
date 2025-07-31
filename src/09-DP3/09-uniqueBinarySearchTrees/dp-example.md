Problem: Unique Binary Search Trees (Dynamic Programming)

Let's trace through numTrees_dp(3) step by step:

Step 1: Initialize
- n = 3
- Create dp array: dp[0, 1, 2, 3] = [0, 0, 0, 0]

Step 2: Set base cases
- dp[0] = 1 (empty tree)
- dp[1] = 1 (single node tree)
- dp = [1, 1, 0, 0]

Step 3: Calculate dp[2] (2 nodes)
For nodes = 2:
  Try root = 1:
    - leftSubtreeNodes = 0, rightSubtreeNodes = 1
    - dp[2] += dp[0] * dp[1] = 1 * 1 = 1
  Try root = 2:
    - leftSubtreeNodes = 1, rightSubtreeNodes = 0  
    - dp[2] += dp[1] * dp[0] = 1 * 1 = 1
- dp[2] = 1 + 1 = 2
- dp = [1, 1, 2, 0]

Step 4: Calculate dp[3] (3 nodes)
For nodes = 3:
  Try root = 1:
    - leftSubtreeNodes = 0, rightSubtreeNodes = 2
    - dp[3] += dp[0] * dp[2] = 1 * 2 = 2
  Try root = 2:
    - leftSubtreeNodes = 1, rightSubtreeNodes = 1
    - dp[3] += dp[1] * dp[1] = 1 * 1 = 1
  Try root = 3:
    - leftSubtreeNodes = 2, rightSubtreeNodes = 0
    - dp[3] += dp[2] * dp[0] = 2 * 1 = 2
- dp[3] = 2 + 1 + 2 = 5
- dp = [1, 1, 2, 5]

Step 5: Return result
- Return dp[3] = 5

Final DP table: [1, 1, 2, 5]
Final Result: 5 unique BSTs can be formed with 3 nodes

The 5 structures are:
1. Root=1: left=empty, right=BST(2,3) → 2 ways
2. Root=2: left=BST(1), right=BST(3) → 1 way  
3. Root=3: left=BST(1,2), right=empty → 2 ways
Total: 2 + 1 + 2 = 5 ways