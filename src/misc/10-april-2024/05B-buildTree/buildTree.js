// You are given two integer arrays preorder and inorder.

// preorder is the preorder traversal of a binary tree
// inorder is the inorder traversal of the same tree
// Both arrays are of the same size and consist of unique values.
// Rebuild the binary tree from the preorder and inorder traversals and return its root.

// Input: preorder = [1,2,3,4], inorder = [2,1,3,4]
// Output: [1,2,3,null,null,null,4]

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
   * @param {number[]} preorder
   * @param {number[]} inorder
   * @return {TreeNode}
   */
  buildTree (preorder, inorder) {
    return this.buildTreeHelper(preorder, inorder, 0, 0, inorder.length - 1)
  }

  buildTreeHelper (preorder, inorder, preStart, inStart, inEnd) {
    if (preStart > preorder.length - 1 || inStart > inEnd) {
      return null
    }

    const root = new TreeNode(preorder[preStart])
    let inIndex = 0

    for (let i = inStart; i <= inEnd; i++) {
      if (inorder[i] === root.val) {
        inIndex = i
      }
    }

    root.left = this.buildTreeHelper(
      preorder,
      inorder,
      preStart + 1,
      inStart,
      inIndex - 1
    )
    root.right = this.buildTreeHelper(
      preorder,
      inorder,
      preStart + inIndex - inStart + 1,
      inIndex + 1,
      inEnd
    )

    return root
  }
}
