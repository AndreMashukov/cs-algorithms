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
      if (root === null) {
          return true;
      }

      const queue = [[root, -Infinity, Infinity]];

    while (queue.length > 0) {
      const [node, left, right] = queue.shift();

          if (!(left < node.val && node.val < right)) {
              return false;
          }
          if (node.left) {
              queue.push([node.left, left, node.val]);
          }
          if (node.right) {
              queue.push([node.right, node.val, right]);
          }
      }

      return true;
  }
}