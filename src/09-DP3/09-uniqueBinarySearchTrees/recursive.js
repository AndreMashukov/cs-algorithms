// 96. Unique Binary Search Trees
// https://leetcode.com/problems/unique-binary-search-trees/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an integer n, return the number of structurally unique BST's (binary search trees) 
// which has exactly n nodes of unique values from 1 to n.
//
// Example 1:
// Input: n = 3
// Output: 5
// Explanation: Given n = 3, there are a total of 5 unique BST's:
//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3
//
// Example 2:
// Input: n = 1
// Output: 1
//
// Constraints:
// - 1 <= n <= 19

/**
 * @param {number} n
 * @return {number}
 */
function numTrees_dfs(n) {
  // Initialize memoization map to cache computed results
  const memo = new Map();
  
  // Helper function to compute number of unique BSTs for a given count
  const dfs = (count) => {
    // Check if result is already computed and cached
    if (memo.has(count)) {
      return memo.get(count);
    }
    
    // Base case: 0 or 1 nodes can form exactly 1 BST structure
    // 0 nodes: empty tree (null), 1 node: single node tree
    if (count <= 1) {
      memo.set(count, 1);
      return 1;
    }
    
    // Calculate total number of unique BSTs by trying each node as root
    let totalTrees = 0;
    
    // Try each number from 1 to count as the root node
    for (let root = 1; root <= count; root++) {
      // Calculate number of nodes in left and right subtrees
      // Left subtree has nodes with values less than root: (root - 1) nodes
      const leftSubtreeNodes = root - 1;
      
      // Right subtree has nodes with values greater than root: (count - root) nodes
      const rightSubtreeNodes = count - root;
      
      // Number of unique left subtrees with leftSubtreeNodes nodes
      const leftSubtrees = dfs(leftSubtreeNodes);
      
      // Number of unique right subtrees with rightSubtreeNodes nodes
      const rightSubtrees = dfs(rightSubtreeNodes);
      
      // Total combinations with current root = left_possibilities × right_possibilities
      // This follows the multiplication principle of combinatorics
      totalTrees += leftSubtrees * rightSubtrees;
    }
    
    // Cache the computed result to avoid recomputation
    memo.set(count, totalTrees);
    return totalTrees;
  };
  
  return dfs(n);
}

// Example Usage:
console.log(numTrees_dfs(1)); // 1
console.log(numTrees_dfs(2)); // 2
console.log(numTrees_dfs(3)); // 5
console.log(numTrees_dfs(4)); // 14