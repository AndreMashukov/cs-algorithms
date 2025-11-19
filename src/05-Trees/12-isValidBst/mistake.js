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
  isValidBST(root) {
      const dfs = (node, min, max) => {
          if (!node) {
              return true
          }

          if (node.val <= min || node.val >= max ) {
              return false
          }

          return dfs(node.left, node.val, max) && dfs(node.right, min, node.val)
      }

      return dfs(root, -Infinity, Infinity)
  }
}