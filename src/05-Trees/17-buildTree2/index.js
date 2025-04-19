// 106. Construct Binary Tree from Inorder and Postorder Traversal
// https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
// https://www.youtube.com/watch?v=vm63HuIU7kw
// Medium
// Topics
// Companies
// Given two integer arrays inorder and postorder
// where inorder is the inorder traversal of a binary tree
// and postorder is the postorder traversal of the same tree,
// construct and return the binary tree.

const TreeNode = require('../16-serializeDeserialize/TreeNode')

// Example 1:
// Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]

/**
 * Constructs a binary tree from inorder and postorder traversal arrays
 * @param {number[]} inorder - Array representing inorder traversal
 * @param {number[]} postorder - Array representing postorder traversal
 * @return {TreeNode} - Root node of constructed tree
 */
const buildTree = function (inorder, postorder) {
  // Helper function for recursive tree construction
  const build = (inorder, postorder) => {
    // Base case: if inorder array is empty, return null
    if (inorder.length === 0) {
      return null
    }

    // Get root value from end of postorder traversal
    const rootVal = postorder.pop()
    const root = new TreeNode(rootVal)

    // Find root index in inorder traversal to split left and right subtrees
    const mid = inorder.indexOf(rootVal)

    // Build right subtree first (postorder: left->right->root)
    root.right = build(inorder.slice(mid + 1), postorder)
    // Build left subtree with remaining nodes
    root.left = build(inorder.slice(0, mid), postorder)

    return root
  }

  return build(inorder, postorder)
}
