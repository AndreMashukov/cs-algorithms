// 112. Path Sum

// Given the root of a binary tree and an integer targetSum,
// return true if the tree has a root-to-leaf path
// such that adding up all the values
// along the path equals targetSum.

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
 * @param {number} targetSum
 * @return {boolean}
 */
const hasPathSum = function (root, targetSum) {
  if (!root) {
    return false // If the root is null, return false
  }

  // If we reach a leaf node, check if the current sum equals targetSum
  if (!root.left && !root.right) {
    return root.val === targetSum
  }

  // Recursively check the left and right subtrees with the updated targetSum
  const newTargetSum = targetSum - root.val
  return (
    hasPathSum(root.left, newTargetSum) || hasPathSum(root.right, newTargetSum)
  )
}
