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
    // Initialize stack for iterative traversal starting with root node
    const stack = [root]
    // Map to store [height, diameter] pair for each processed node
    const mp = new Map()
    // Base case: null nodes have height 0 and diameter 0
    mp.set(null, [0, 0])

    // posto-order traversal: root node is processed last
    while (stack.length > 0) {
      // Get the top node without popping (we may need to process children first)
      let node = stack[stack.length - 1]

      // Implement post-order traversal (left -> right -> node)
      // If left child exists and hasn't been processed, traverse left first
      if (node.left && !mp.has(node.left)) {
        stack.push(node.left)
      } else if (node.right && !mp.has(node.right)) {
        // If right child exists and hasn't been processed, traverse right next
        stack.push(node.right)
      } else {
        // If both children are processed or don't exist, process current node
        // Now we can pop and process the current node
        node = stack.pop()

        // Retrieve height and diameter information from both children
        const [leftHeight, leftDiameter] = mp.get(node.left)
        const [rightHeight, rightDiameter] = mp.get(node.right)

        // Calculate height of current subtree (1 + max height of either child)
        const height = 1 + Math.max(leftHeight, rightHeight)

        // Calculate diameter at current node as max of:
        // 1. Path through current node: leftHeight + rightHeight
        // 2. Maximum diameter in left subtree
        // 3. Maximum diameter in right subtree
        const diameter = Math.max(
          leftHeight + rightHeight,
          Math.max(leftDiameter, rightDiameter)
        )

        // Store computed values for current node
        mp.set(node, [height, diameter])
      }
    }
    // Return the diameter of the entire tree
    return mp.get(root)[1]
  }
}
