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
    const stack = []
    let node = root
    // last node processed (used to determine if we should process current node)
    let last = null
    const depths = new Map()

    // post-order traversal: left -> right -> node
    while (stack.length > 0 || node !== null) {
      if (node !== null) {
        stack.push(node)
        node = node.left
      } else {
        node = stack[stack.length - 1]
        if (node.right === null || last === node.right) {
          stack.pop()
          const left = depths.get(node.left) || 0
          const right = depths.get(node.right) || 0
          if (Math.abs(left - right) > 1) return false
          depths.set(node, 1 + Math.max(left, right))
          last = node
          node = null
        } else {
          node = node.right
        }
      }
    }
    return true
  }
}
