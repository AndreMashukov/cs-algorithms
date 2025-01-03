// 106. Construct Binary Tree from Inorder and Postorder Traversal
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

const buildTree = function (inorder, postorder) {
  const build = (inorder, postorder) => {
    if (inorder.length === 0) {
      return null
    }

    const rootVal = postorder.pop()
    const root = new TreeNode(rootVal)

    const mid = inorder.indexOf(rootVal)

    root.right = build(inorder.slice(mid + 1), postorder)
    root.left = build(inorder.slice(0, mid), postorder)

    return root
  }

  return build(inorder, postorder)
}
