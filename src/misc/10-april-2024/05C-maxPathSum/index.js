// Given the root of a non-empty binary tree, return the maximum path sum of any non-empty path.

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
    // Initialize the result array with the root value
    const res = [root.val]
    // Call the dfs helper function to compute the maximum path sum
    this.dfs(root, res)
    // Return the maximum path sum found
    return res[0]
  }

  /**
   * @param {TreeNode} root
   * @param {number[]} res
   * @return {number}
   */
  dfs (root, res) {
    // Base case: if the node is null, return 0
    if (root === null) {
      return 0
    }

    // Recursively find the maximum path sum of the left and right subtrees
    // If the path sum is negative, consider it as 0 (ignore the path)
    const leftMax = Math.max(this.dfs(root.left, res), 0)
    const rightMax = Math.max(this.dfs(root.right, res), 0)

    // Update the result with the maximum path sum that includes the current node
    res[0] = Math.max(res[0], root.val + leftMax + rightMax)

    // Return the maximum path sum that can be extended to the parent node
    return root.val + Math.max(leftMax, rightMax)
  }
}

// Calculate Path Sums: For each node, calculate the maximum path sum
// of its left and right subtrees. If a subtree path sum is negative,
//  treat it as zero (ignore the path).
// Left and Right Subtrees: Recursively calculate the maximum path sums for the left and right subtrees.
// Update Global Maximum: Update the global maximum path sum if the current path sum is greater.
// Return to Parent: Return the maximum path sum that can be extended to the parent node.
