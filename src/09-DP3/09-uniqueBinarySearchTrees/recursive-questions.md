Problem: Unique Binary Search Trees (DFS with Memoization)

Q1: What does the recursive function compute when called with dfs(3)?
1. The number of unique BSTs that can be formed with exactly 3 nodes
2. The number of ways to arrange 3 nodes in any tree structure
3. The height of the tallest BST with 3 nodes
4. The number of leaf nodes in BSTs with 3 nodes

Q2: When root = 2 and total nodes = 4, how many nodes are in the left and right subtrees?
1. Left: 1, Right: 1
2. Left: 1, Right: 2
3. Left: 2, Right: 1
4. Left: 0, Right: 3

Q3: Why is dfs(0) defined to return 1 instead of 0?
1. Because an empty tree is considered one valid BST structure
2. To avoid division by zero in calculations
3. To handle the base case of recursion properly
4. To maintain consistency with mathematical conventions

Q4: What is the relationship between the number of unique BSTs and Catalan numbers?
1. They are completely unrelated
2. Unique BSTs with n nodes equals the nth Catalan number
3. Catalan numbers are always larger than unique BSTs
4. Unique BSTs are a subset of Catalan number applications

Q5: For n=3, when root=2, what recursive calls are made?
1. dfs(1) and dfs(1)
2. dfs(2) and dfs(1)
3. dfs(1) and dfs(2)
4. dfs(0) and dfs(2)

Q6: How does memoization improve the performance of this algorithm?
1. It reduces space complexity from O(n) to O(1)
2. It prevents recalculating the same subproblems multiple times
3. It changes the algorithm from recursive to iterative
4. It allows processing larger input values

Q7: What is the final calculation for the total number of BSTs with a specific root?
1. leftSubtrees + rightSubtrees
2. leftSubtrees * rightSubtrees
3. max(leftSubtrees, rightSubtrees)
4. leftSubtrees^rightSubtrees