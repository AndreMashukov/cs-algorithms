// Given a binary tree, return true if it is height-balanced
// and false otherwise.

// A height-balanced binary tree is defined
// as a binary tree in which the left
// and right subtrees of every node differ
// in height by no more than 1.

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
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = function (root) {
  // Closure function for DFS
  const dfs = (node) => {
    if (!node) {
      // If the current node is null, return [true, 0]
      // true indicates the subtree is balanced, 0 is the height
      return [true, 0]
    }

    // Recursively check the left and right subtrees
    const left = dfs(node.left)
    const right = dfs(node.right)

    // Check if the current subtree is balanced
    // A subtree is balanced if:
    // 1. The left subtree is balanced
    // 2. The right subtree is balanced
    // 3. The height difference between the left and right subtrees is at most 1
    const balanced =
          left[0] &&
          right[0] &&
          Math.abs(left[1] - right[1]) <= 1

    // Calculate the height of the current node
    const height = 1 + Math.max(left[1], right[1])

    // Return [true, height] if balanced, otherwise [false, height]
    return [balanced, height]
  }

  // Call the closure function with the root node
  return dfs(root)[0]
}
