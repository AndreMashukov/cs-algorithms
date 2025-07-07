// 124. Binary Tree Maximum Path Sum
// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the 
// sequence has an edge connecting them. A node can only appear in the sequence at most once. 
// Note that the path does not need to pass through the root.
// The path sum of a path is the sum of the node's values in the path.
// Given the root of a binary tree, return the maximum path sum of any non-empty path.
//
// Example 1:
// Input: root = [1,2,3]
//        1
//       / \
//      2   3
// Output: 6
// Explanation: The optimal path is 2 → 1 → 3 with a path sum of 2 + 1 + 3 = 6.
//
// Example 2:
// Input: root = [-10,9,20,null,null,15,7]
//       -10
//       /  \
//      9    20
//          /  \
//         15   7
// Output: 42
// Explanation: The optimal path is 15 → 20 → 7 with a path sum of 15 + 20 + 7 = 42.
//
// Constraints:
// - The number of nodes in the tree is in the range [1, 3 * 10^4].
// - -1000 <= Node.val <= 1000

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum_dfs(root) {
  // Map to store memoized results for each node
  const memo = new Map();
  
  // Variable to track the global maximum path sum
  let globalMax = -Infinity;
  
  /**
   * DFS function to calculate maximum path sum starting from a node
   * @param {TreeNode} node - Current node being processed
   * @return {number} Maximum path sum that goes down from this node (can be extended by parent)
   */
  const dfs = (node) => {
    // Base case: null node contributes 0
    if (!node) {
      return 0;
    }
    
    // Check if we've already computed this node
    if (memo.has(node)) {
      return memo.get(node);
    }
    
    // Recursively get maximum path sums from left and right subtrees
    // We take max with 0 because negative paths won't improve our sum
    const leftMax = Math.max(0, dfs(node.left));   // Maximum sum going down left subtree
    const rightMax = Math.max(0, dfs(node.right)); // Maximum sum going down right subtree
    
    // Calculate the maximum path sum that passes through current node as the highest point
    // This path cannot be extended by parent nodes
    const maxThroughNode = node.val + leftMax + rightMax;
    
    // Update global maximum if this path is better
    globalMax = Math.max(globalMax, maxThroughNode);
    
    // Calculate maximum path sum that starts from this node and goes down
    // This can be extended by parent nodes (only one side can be chosen)
    const maxPathDown = node.val + Math.max(leftMax, rightMax);
    
    // Memoize the result
    memo.set(node, maxPathDown);
    
    // Return the maximum sum of path that goes down from this node
    return maxPathDown;
  };
  
  // Start DFS from root
  dfs(root);
  
  // Return the global maximum path sum found
  return globalMax;
}

// Example Usage:
// Example 1: [1,2,3]
const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
console.log(maxPathSum_dfs(root1)); // Expected: 6

// Example 2: [-10,9,20,null,null,15,7]
const root2 = new TreeNode(-10);
root2.left = new TreeNode(9);
root2.right = new TreeNode(20);
root2.right.left = new TreeNode(15);
root2.right.right = new TreeNode(7);
console.log(maxPathSum_dfs(root2)); // Expected: 42

// Example 3: Single node with negative value
const root3 = new TreeNode(-3);
console.log(maxPathSum_dfs(root3)); // Expected: -3

// Example 4: [2,-1]
const root4 = new TreeNode(2);
root4.left = new TreeNode(-1);
console.log(maxPathSum_dfs(root4)); // Expected: 2