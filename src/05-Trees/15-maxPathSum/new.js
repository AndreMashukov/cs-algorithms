/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  maxPathSum (root) {
    // Initialize max to the smallest possible value
    let max = -Infinity

    // Helper function to perform a preorder traversal
    const preorder = (root) => {
      // Base case: if the node is null, return 0
      if (!root) return 0

      // Recursively find the maximum path sum of the left and right subtrees
      // If the path sum is negative, consider it as 0 (ignore the path)
      const left = Math.max(preorder(root.left), 0)
      const right = Math.max(preorder(root.right), 0)

      // Update the global maximum path sum if the current path sum is greater
      max = Math.max(max, left + right + root.val)

      // Return the maximum path sum that can be extended to the parent node
      return Math.max(left, right) + root.val
    };

    // Start the preorder traversal from the root
    preorder(root)

    // Return the maximum path sum found
    return max
  }
}
