// Given the roots of two binary trees p and q,
// return true if the trees are equivalent,
// otherwise return false.

// Two binary trees are considered equivalent
// if they share the exact same structure
// and the nodes have the same values.

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
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {boolean}
   */
  isSameTree (p, q) {
    // If both nodes are null, the trees are equivalent
    if (!p && !q) {
      return true
    }
    // If both nodes are not null and their values are equal,
    // recursively check the left and right subtrees
    if (p && q && p.val === q.val) {
      return (
        this.isSameTree(p.left, q.left) &&
        this.isSameTree(p.right, q.right)
      )
    } else {
      // If one node is null and the other is not, or their values are not equal,
      // the trees are not equivalent
      return false
    }
  }
}
