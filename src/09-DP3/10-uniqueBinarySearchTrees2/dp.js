// Problem: Unique Binary Search Trees II
// LeetCode URL: https://leetcode.com/problems/unique-binary-search-trees-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an integer n, return all the structurally unique BST's (binary search trees), 
// which has exactly n nodes of unique values from 1 to n.

// Definition for a binary tree node
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
function generateTrees_dp(n) {
  // Handle edge case
  if (n === 0) return [];
  
  // DP array where dp[len] contains all possible BST structures with len nodes
  const dp = Array(n + 1).fill(null).map(() => []);
  
  // Base case: empty tree (0 nodes)
  dp[0] = [null];
  
  // Base case: single node tree (1 node)
  if (n >= 1) {
    dp[1] = [new TreeNode(1)];
  }
  
  // Helper function to clone a tree with offset added to all node values
  const cloneWithOffset = (root, offset) => {
    if (root === null) return null;
    
    const newNode = new TreeNode(root.val + offset);
    newNode.left = cloneWithOffset(root.left, offset);
    newNode.right = cloneWithOffset(root.right, offset);
    return newNode;
  };
  
  // Fill DP table for lengths 2 to n
  for (let len = 2; len <= n; len++) {
    // Try each position as root (1-indexed)
    for (let root = 1; root <= len; root++) {
      // Calculate left and right subtree sizes
      const leftSize = root - 1;
      const rightSize = len - root;
      
      // Get all possible left subtrees
      const leftTrees = dp[leftSize];
      
      // Get all possible right subtrees (need to clone with offset)
      const rightTrees = dp[rightSize];
      
      // Combine each left tree with each right tree
      for (let leftTree of leftTrees) {
        for (let rightTree of rightTrees) {
          // Create root node with current value
          const rootNode = new TreeNode(root);
          
          // Attach left subtree directly (values 1 to root-1)
          rootNode.left = leftTree;
          
          // Clone right subtree with offset to get values root+1 to len
          rootNode.right = cloneWithOffset(rightTree, root);
          
          // Add this tree configuration to results for current length
          dp[len].push(rootNode);
        }
      }
    }
  }
  
  // Return all possible BSTs with n nodes
  return dp[n];
}

// Example Usage:
console.log(generateTrees_dp(1)); // [[1]]
console.log(generateTrees_dp(2)); // [[1,null,2],[2,1]]
console.log(generateTrees_dp(3)); // 5 different tree structures