// 124. Binary Tree Maximum Path Sum
// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.
// A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
// The path sum of a path is the sum of the node's values in the path.
// Given the root of a binary tree, return the maximum path sum of any non-empty path.

// Example 1:
// Input: root = [1,2,3]
//      1
//     / \
//    2   3
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

// Example 2:
// Input: root = [-10,9,20,null,null,15,7]
//        -10
//       /  \
//      9    20
//          /  \
//         15   7
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Find the maximum path sum in a binary tree
 * Key insight: At each node, we can either:
 * 1. Extend the path from parent (return max of left/right + current)
 * 2. Start a new path through current node (left + current + right)
 * 
 * @param {TreeNode} root - Root of the binary tree
 * @return {number} - Maximum path sum
 */
const maxPathSum = (root) => {
  let maxSum = -Infinity
  
  /**
   * DFS helper function that returns the maximum path sum
   * that can be extended to the parent node
   * @param {TreeNode} node - Current node
   * @return {number} - Maximum path sum extending upward
   */
  const dfs = (node) => {
    // Base case: null node contributes 0
    if (!node) return 0
    
    // Get maximum path sum from left and right subtrees
    // Use Math.max(0, ...) to ignore negative paths
    const leftMax = Math.max(0, dfs(node.left))
    const rightMax = Math.max(0, dfs(node.right))
    
    // Calculate the maximum path sum that passes through current node
    // This includes both left and right subtrees (cannot be extended upward)
    const currentMax = node.val + leftMax + rightMax
    
    // Update global maximum
    maxSum = Math.max(maxSum, currentMax)
    
    // Return the maximum path sum that can be extended to parent
    // We can only choose one side (left or right) when extending upward
    return node.val + Math.max(leftMax, rightMax)
  }
  
  dfs(root)
  return maxSum
}

/**
 * Alternative implementation using a class-based approach
 */
class Solution {
  maxPathSum(root) {
    this.maxSum = -Infinity
    this.dfs(root)
    return this.maxSum
  }
  
  dfs(node) {
    if (!node) return 0
    
    // Get maximum contribution from left and right subtrees
    const left = Math.max(0, this.dfs(node.left))
    const right = Math.max(0, this.dfs(node.right))
    
    // Update global maximum with path through current node
    this.maxSum = Math.max(this.maxSum, node.val + left + right)
    
    // Return maximum path sum that can be extended upward
    return node.val + Math.max(left, right)
  }
}

// Helper function to create test trees
const createTree = (values) => {
  if (!values.length) return null
  
  const root = new TreeNode(values[0])
  const queue = [root]
  let i = 1
  
  while (queue.length && i < values.length) {
    const node = queue.shift()
    
    if (values[i] !== null) {
      node.left = new TreeNode(values[i])
      queue.push(node.left)
    }
    i++
    
    if (i < values.length && values[i] !== null) {
      node.right = new TreeNode(values[i])
      queue.push(node.right)
    }
    i++
  }
  
  return root
}

// Test cases
console.log("Testing Binary Tree Maximum Path Sum")
console.log("=====================================")

// Test 1: Simple tree [1,2,3]
const tree1 = createTree([1, 2, 3])
console.log("Test 1 - Tree [1,2,3]:")
console.log("Expected: 6, Got:", maxPathSum(tree1))

// Test 2: Tree with negative root [-10,9,20,null,null,15,7]
const tree2 = createTree([-10, 9, 20, null, null, 15, 7])
console.log("Test 2 - Tree [-10,9,20,null,null,15,7]:")
console.log("Expected: 42, Got:", maxPathSum(tree2))

// Test 3: Single node
const tree3 = createTree([5])
console.log("Test 3 - Single node [5]:")
console.log("Expected: 5, Got:", maxPathSum(tree3))

// Test 4: All negative values
const tree4 = createTree([-3, -2, -1])
console.log("Test 4 - All negative [-3,-2,-1]:")
console.log("Expected: -1, Got:", maxPathSum(tree4))

// Test 5: Linear tree
const tree5 = createTree([1, 2, null, 3, null, 4])
console.log("Test 5 - Linear tree [1,2,null,3,null,4]:")
console.log("Expected: 10, Got:", maxPathSum(tree5))

// Test using class-based solution
const solution = new Solution()
console.log("\nTesting class-based solution:")
console.log("Tree [1,2,3] result:", solution.maxPathSum(createTree([1, 2, 3])))

module.exports = { maxPathSum, Solution, TreeNode, createTree }