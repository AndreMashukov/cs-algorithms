// Given a binary tree, return true if it is height-balanced
// and false otherwise.

// A height-balanced binary tree is defined
// as a binary tree in which the left
// and right subtrees of every node differ i
// n height by no more than 1.

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
   * @return {boolean}
   */
  isBalanced (root) {
    return this.dfs(root)[0] === 1
  }

  /**
   * @param {TreeNode} root
   * @return {number[]}
   */
  dfs (root) {
    if (!root) {
      // If the current node is null, return [1, 0]
      // 1 indicates the subtree is balanced, 0 is the height
      return [1, 0]
    }

    // Recursively check the left and right subtrees
    const left = this.dfs(root.left)
    const right = this.dfs(root.right)

    // Check if the current subtree is balanced
    // A subtree is balanced if:
    // 1. The left subtree is balanced
    // 2. The right subtree is balanced
    // 3. The height difference between the left and right subtrees is at most 1
    const balanced =
          left[0] === 1 &&
          right[0] === 1 &&
          Math.abs(left[1] - right[1]) <= 1

    // Calculate the height of the current node
    const height = 1 + Math.max(left[1], right[1])

    // Return [1, height] if balanced, otherwise [0, height]
    return [balanced ? 1 : 0, height]
  }
}
