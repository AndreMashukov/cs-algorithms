// The diameter of a binary tree is defined as the length of the longest path
// between any two nodes within the tree.
// The path does not necessarily have to pass through the root.

// The length of a path between two nodes in a binary tree
// is the number of edges between the nodes.

// Given the root of a binary tree root,
// return the diameter of the tree.

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
  diameterOfBinaryTree (root) {
    let res = 0

    // Helper function to perform depth-first search
    const dfs = (curr) => {
      if (!curr) {
        // If the current node is null, return 0
        return 0
      }

      // Recursively find the length of the left and right subtrees
      const left = dfs(curr.left)
      const right = dfs(curr.right)

      // Update the result with the maximum diameter found so far
      res = Math.max(res, left + right)

      // Return the height of the current node
      return 1 + Math.max(left, right)
    }

    // Start DFS from the root
    dfs(root)

    // Return the maximum diameter found
    return res
  }
}
