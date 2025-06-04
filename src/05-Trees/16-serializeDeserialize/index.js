const TreeNode = require('./TreeNode') // Import the TreeNode class
// Serialize and Deserialize Binary Tree
// Implement an algorithm to serialize and deserialize a binary tree.

// Serialization is the process of converting an in-memory
// structure into a sequence of bits so that it can be
//  stored or sent across a network to be reconstructed later
// in another computer environment.

// You just need to ensure that a binary tree can be serialized
// to a string and this string can be deserialized
// to the original tree structure.
// There is no additional restriction
// on how your serialization/deserialization algorithm should work.

// Note: The input/output format in the examples
// is the same as how NeetCode serializes a binary tree.
// You do not necessarily need to follow this format.

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

class Codec {
  /**
   * Encodes a tree to a single string.
   *
   * @param {TreeNode} root
   * @return {string}
   */
  serialize (root) {
    if (!root) {
      return 'null'
    }

    const left = this.serialize(root.left)
    const right = this.serialize(root.right)

    return `${root.val},${left},${right}`
  }

  /**
   * Decodes your encoded data to tree.
   *
   * @param {string} data
   * @return {TreeNode}
   */
  deserialize (data) {
    const nodes = data.split(',')

    const buildTree = () => {
      // Get next node value from the array
      // Take the first element from the array
      const val = nodes.shift()

      if (val === 'null') {
        return null
      }

      const node = new TreeNode(val)
      node.left = buildTree()
      node.right = buildTree()

      return node
    }

    return buildTree()
  }
}
