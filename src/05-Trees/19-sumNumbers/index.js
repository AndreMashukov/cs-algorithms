// 129. Sum Root to Leaf Numbers
// https://leetcode.com/problems/sum-root-to-leaf-numbers/description/
// You are given the root of a binary tree containing digits from 0 to 9 only.

// Each root-to-leaf path in the tree represents a number.

// For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
// Return the total sum of all root-to-leaf numbers.
// Test cases are generated so that the answer
// will fit in a 32-bit integer.

// A leaf node is a node with no children.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root - The root node of the binary tree
 * @return {number} - The sum of all root-to-leaf numbers
 */
const sumNumbers = function (root) {
  // Helper function to perform depth-first search
  // @param {TreeNode} node - Current node being processed
  // @param {number} sum - Current accumulated sum from root to current node
  // @return {number} - Sum of all paths from current node to leaves
  const dfs = (node, sum) => {
    // Base case: if node is null, return 0 (no contribution to sum)
    if (!node) {
      return 0
    }

    // Update the current sum by appending current node's value
    // This is equivalent to shifting left and adding the new digit
    sum = sum * 10 + node.val

    // If we've reached a leaf node, return the current sum
    // This represents one complete path from root to leaf
    if (!node.left && !node.right) {
      return sum
    }

    // Recursively process left and right subtrees and sum their results
    // This accumulates all possible paths from the current node
    return dfs(node.left, sum) + dfs(node.right, sum)
  }

  // Start DFS from root with initial sum of 0
  return dfs(root, 0)
}

// Test case
console.log(sumNumbers({
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
})) // 25
// Explanation: The root-to-leaf path 1->2 represents the number 12.
// The root-to-leaf path 1->3 represents the number 13.
// Therefore, sum = 12 + 13 = 25.
