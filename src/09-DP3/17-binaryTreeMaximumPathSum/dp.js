// Problem: Binary Tree Maximum Path Sum
// LeetCode URL: https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=problem-list-v2&envId=dynamic-programming
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
function maxPathSum_dp(root) {
  // Variable to track the global maximum path sum
  let globalMax = -Infinity;
  
  /**
   * Helper function that implements bottom-up DP on the tree
   * For each node, it computes the maximum path sum that starts from this node and goes down
   * @param {TreeNode} node - Current node being processed
   * @return {number} Maximum sum of path going down from this node
   */
  const computeMaxPath = (node) => {
    // Base case: null nodes contribute 0 to the path
    if (!node) {
      return 0;
    }
    
    // Bottom-up DP: First compute values for children (post-order traversal)
    // Get the maximum path sum going down from left child
    const leftMaxPath = computeMaxPath(node.left);
    
    // Get the maximum path sum going down from right child
    const rightMaxPath = computeMaxPath(node.right);
    
    // Only include positive contributions from children
    // If a child's max path is negative, we ignore it (treat as 0)
    const leftContribution = Math.max(0, leftMaxPath);
    const rightContribution = Math.max(0, rightMaxPath);
    
    // Calculate the maximum path that has current node as the highest point
    // This includes the node value plus contributions from both children
    const maxPathThroughNode = node.val + leftContribution + rightContribution;
    
    // Update global maximum with this complete path
    globalMax = Math.max(globalMax, maxPathThroughNode);
    
    // Return the maximum path that starts from this node and goes down
    // We can only choose one direction (left or right) for the path that continues upward
    const maxDownPath = node.val + Math.max(leftContribution, rightContribution);
    
    return maxDownPath;
  };
  
  // Start the bottom-up computation from root
  computeMaxPath(root);
  
  // Return the maximum path sum found across all nodes
  return globalMax;
}

// Example Usage:
// Example 1: [1,2,3]
const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
console.log(maxPathSum_dp(root1)); // Expected: 6

// Example 2: [-10,9,20,null,null,15,7]
const root2 = new TreeNode(-10);
root2.left = new TreeNode(9);
root2.right = new TreeNode(20);
root2.right.left = new TreeNode(15);
root2.right.right = new TreeNode(7);
console.log(maxPathSum_dp(root2)); // Expected: 42

// Example 3: Single node with negative value
const root3 = new TreeNode(-3);
console.log(maxPathSum_dp(root3)); // Expected: -3

// Example 4: [2,-1]
const root4 = new TreeNode(2);
root4.left = new TreeNode(-1);
console.log(maxPathSum_dp(root4)); // Expected: 2