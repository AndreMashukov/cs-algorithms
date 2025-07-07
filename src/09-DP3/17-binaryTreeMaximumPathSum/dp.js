// Problem: Binary Tree Maximum Path Sum
// LeetCode URL: https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.
// A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
// The path sum of a path is the sum of the node's values in the path.
// Given the root of a binary tree, return the maximum path sum of any non-empty path.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum_dp(root) {
  // In tree problems, DP is typically implemented using post-order traversal
  // where we calculate results for children before processing the parent
  
  // Map to store the maximum path sum starting from each node going downward
  // This acts as our DP memoization table
  const dpDown = new Map();
  
  // Track the global maximum path sum that can pass through any node
  let globalMaxSum = -Infinity;
  
  // Post-order traversal to fill the DP table
  const postOrderTraversal = (node) => {
    // Base case: null node contributes 0 to any path
    if (!node) {
      return 0;
    }
    
    // Process left and right subtrees first (post-order)
    const leftDownSum = postOrderTraversal(node.left);
    const rightDownSum = postOrderTraversal(node.right);
    
    // Calculate DP values for current node:
    // 1. Maximum path sum going down from current node (for parent to use)
    const currentDownSum = node.val + Math.max(0, Math.max(leftDownSum, rightDownSum));
    
    // Store in DP table
    dpDown.set(node, currentDownSum);
    
    // 2. Maximum path sum passing through current node (including both subtrees)
    const currentThroughSum = node.val + Math.max(0, leftDownSum) + Math.max(0, rightDownSum);
    
    // Update global maximum
    globalMaxSum = Math.max(globalMaxSum, currentThroughSum);
    
    // Return the downward path sum for parent node's calculation
    return currentDownSum;
  };
  
  // Start post-order traversal from root
  postOrderTraversal(root);
  
  return globalMaxSum;
}

// Alternative DP approach using explicit state tracking
function maxPathSum_dp_explicit(root) {
  // DP state: for each node, we track two values:
  // 1. maxDownPath: maximum path sum starting from this node going down
  // 2. maxThroughPath: maximum path sum passing through this node
  
  const dpStates = new Map();
  let globalMax = -Infinity;
  
  const calculateDP = (node) => {
    if (!node) {
      return { maxDownPath: 0, maxThroughPath: 0 };
    }
    
    // Calculate DP for children first
    const leftState = calculateDP(node.left);
    const rightState = calculateDP(node.right);
    
    // Calculate current node's DP state
    const currentState = {
      // Maximum path going down from current node
      maxDownPath: node.val + Math.max(0, Math.max(leftState.maxDownPath, rightState.maxDownPath)),
      
      // Maximum path passing through current node
      maxThroughPath: node.val + Math.max(0, leftState.maxDownPath) + Math.max(0, rightState.maxDownPath)
    };
    
    // Store the state
    dpStates.set(node, currentState);
    
    // Update global maximum with current node's through path
    globalMax = Math.max(globalMax, currentState.maxThroughPath);
    
    return currentState;
  };
  
  calculateDP(root);
  return globalMax;
}

// Tree node constructor for testing
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

// Example Usage:
// Example 1: [1,2,3]
const root1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(maxPathSum_dp(root1)); // Expected: 6

// Example 2: [-10,9,20,null,null,15,7]
const root2 = new TreeNode(-10, 
  new TreeNode(9), 
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(maxPathSum_dp(root2)); // Expected: 42

// Example 3: Single node
const root3 = new TreeNode(5);
console.log(maxPathSum_dp(root3)); // Expected: 5

// Example 4: All negative values
const root4 = new TreeNode(-3, new TreeNode(-2), new TreeNode(-1));
console.log(maxPathSum_dp(root4)); // Expected: -1