// 124. Binary Tree Maximum Path Sum
// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.
// A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
// The path sum of a path is the sum of the node's values in the path.
// Given the root of a binary tree, return the maximum path sum of any non-empty path.
//
// Example 1:
// Input: root = [1,2,3]
//        1
//       / \
//      2   3
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
//
// Example 2:
// Input: root = [-10,9,20,null,null,15,7]
//          -10
//         /   \
//        9     20
//            /   \
//           15    7
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
//
// Constraints:
// The number of nodes in the tree is in the range [1, 3 * 10^4].
// -1000 <= Node.val <= 1000

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
function maxPathSum_dfs(root) {
  // Track the global maximum path sum across all possible paths
  let globalMaxSum = -Infinity;
  
  // Helper function that returns the maximum sum of a path that starts from the current node
  // and goes down (either left or right, but not both)
  // This is crucial: the path returned can only go in one direction to be part of a larger path
  const dfs = (node) => {
    // Base case: if node is null, contribute 0 to the path sum
    if (!node) {
      return 0;
    }
    
    // Recursively calculate the maximum path sum from left and right subtrees
    // Use Math.max with 0 to ignore negative path sums (we can choose not to include them)
    const leftMaxSum = Math.max(0, dfs(node.left));
    const rightMaxSum = Math.max(0, dfs(node.right));
    
    // Calculate the maximum path sum that passes through the current node
    // This path includes the current node, and potentially both left and right subtrees
    const currentPathSum = node.val + leftMaxSum + rightMaxSum;
    
    // Update the global maximum if the current path sum is better
    globalMaxSum = Math.max(globalMaxSum, currentPathSum);
    
    // Return the maximum path sum that starts from current node and goes down in one direction
    // This can be used by the parent node to form a larger path
    // We can only return one direction (left or right) to maintain the path property
    return node.val + Math.max(leftMaxSum, rightMaxSum);
  };
  
  // Start the DFS from the root
  dfs(root);
  
  // Return the global maximum path sum found
  return globalMaxSum;
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
console.log(maxPathSum_dfs(root1)); // Expected: 6

// Example 2: [-10,9,20,null,null,15,7]
const root2 = new TreeNode(-10, 
  new TreeNode(9), 
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(maxPathSum_dfs(root2)); // Expected: 42

// Example 3: Single node
const root3 = new TreeNode(5);
console.log(maxPathSum_dfs(root3)); // Expected: 5

// Example 4: All negative values
const root4 = new TreeNode(-3, new TreeNode(-2), new TreeNode(-1));
console.log(maxPathSum_dfs(root4)); // Expected: -1