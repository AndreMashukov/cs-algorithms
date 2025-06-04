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
   * Determines if a binary tree is height-balanced.
   * A binary tree is height-balanced if the absolute difference between the heights
   * of the left and right subtrees of every node is at most 1.
   * 
   * @param {TreeNode} root - The root node of the binary tree
   * @return {boolean} - True if the tree is balanced, false otherwise
   */
  isBalanced (root) {
    // Stack for iterative post-order traversal
    const stack = []
    let node = root
    // Tracks the last processed node to determine if we should process current node
    let last = null
    // Map to store the height of each node
    const map = new Map()

    // Post-order traversal: left -> right -> node
    while (stack.length > 0 || node !== null) {
      if (node !== null) {
        // Keep going left until we reach a leaf
        stack.push(node)
        node = node.left
      } else {
        // Backtrack to the most recent node
        node = stack[stack.length - 1]
        // If right child is null or we've already processed the right child
        if (node.right === null || last === node.right) {
          stack.pop()
          // Get heights of left and right subtrees (default to 0 if null)
          const left = map.get(node.left) || 0
          const right = map.get(node.right) || 0
          // Check if current node's subtrees are balanced
          if (Math.abs(left - right) > 1) return false
          // Store the height of current node (1 + max of left/right heights)
          map.set(node, 1 + Math.max(left, right))
          // Mark this node as processed
          last = node
          node = null
        } else {
          // Process right subtree
          node = node.right
        }
      }
    }
    return true
  }
}
