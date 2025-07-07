// Problem: Unique Binary Search Trees
// LeetCode URL: https://leetcode.com/problems/unique-binary-search-trees/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an integer n, return the number of structurally unique BST's (binary search trees) 
// which has exactly n nodes of unique values from 1 to n.

/**
 * @param {number} n
 * @return {number}
 */
function numTrees_dp(n) {
  // Initialize DP array where dp[i] represents number of unique BSTs with i nodes
  const dp = Array(n + 1).fill(0);
  
  // Base cases: 0 and 1 nodes can form exactly 1 BST structure each
  // dp[0] = 1: empty tree (important for calculations)
  // dp[1] = 1: single node tree
  dp[0] = 1;
  dp[1] = 1;
  
  // Fill DP table from bottom up for 2 to n nodes
  for (let nodes = 2; nodes <= n; nodes++) {
    // For current number of nodes, try each possible root position
    for (let root = 1; root <= nodes; root++) {
      // When root is at position 'root', we have:
      // - Left subtree: (root - 1) nodes (values 1 to root-1)
      // - Right subtree: (nodes - root) nodes (values root+1 to nodes)
      
      const leftSubtreeNodes = root - 1;
      const rightSubtreeNodes = nodes - root;
      
      // Number of ways to form left subtree with leftSubtreeNodes nodes
      const leftSubtreeWays = dp[leftSubtreeNodes];
      
      // Number of ways to form right subtree with rightSubtreeNodes nodes
      const rightSubtreeWays = dp[rightSubtreeNodes];
      
      // Add the product to total ways for current number of nodes
      // This represents all combinations of left and right subtrees with current root
      dp[nodes] += leftSubtreeWays * rightSubtreeWays;
    }
  }
  
  // Return the number of unique BSTs with n nodes
  return dp[n];
}

// Example Usage:
console.log(numTrees_dp(1)); // 1
console.log(numTrees_dp(2)); // 2  
console.log(numTrees_dp(3)); // 5
console.log(numTrees_dp(4)); // 14