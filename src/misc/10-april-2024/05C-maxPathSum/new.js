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
  maxPathSum(root) {
      let max = -Infinity

      const preorder = (root) => {
          if (!root) return 0;

          const left = Math.max(preorder(root.left), 0);
          const right = Math.max(preorder(root.right), 0);
          max = Math.max(max, left + right + root.val);

          return Math.max(left, right) + root.val
      } 

      preorder(root)

      return max      
  }
}
