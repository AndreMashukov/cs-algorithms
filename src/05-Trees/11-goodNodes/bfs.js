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
  goodNodes(root) {
    let res = 0;
    let q = [];
    q.push([root, -Infinity]);

    while (q.length > 0) {
      let [node, maxval] = q.shift();
      if (node.val >= maxval) {
        res++;
      }
      if (node.left) {
        q.push([node.left, Math.max(maxval, node.val)]);
      }
      if (node.right) {
        q.push([node.right, Math.max(maxval, node.val)]);
      }
    }
    return res;
  }
}
