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

// Detailed Steps
// buildTree Method:

// This is the main method that initiates the tree reconstruction.
// It calls the helper method buildTreeHelper with initial indices for preorder and inorder arrays.
// buildTreeHelper Method:

// Base Case: If preStart exceeds the length of the preorder array or inStart exceeds inEnd, return null. This means there are no more nodes to process.
// Create Root Node: The root node is created using the current value in the preorder array (preorder[preStart]).
// Find Root in Inorder Array: Loop through the inorder array to find the index of the root node (inIndex). This index splits the inorder array into left and right subtrees.
// Recursive Calls:
// Left Subtree: Recursively build the left subtree using the next element in preorder (preStart + 1) and the left part of the inorder array (inStart to inIndex - 1).
// Right Subtree: Recursively build the right subtree using the appropriate element in preorder (preStart + inIndex - inStart + 1) and the right part of the inorder array (inIndex + 1 to inEnd).
// Example
// For preorder = [1, 2, 3, 4] and inorder = [2, 1, 3, 4]:

// First Call: buildTreeHelper(preorder, inorder, 0, 0, 3)
// Root: 1 (from preorder[0])
// inIndex of 1 in inorder: 1
// Left Subtree: buildTreeHelper(preorder, inorder, 1, 0, 0) (for 2)
// Right Subtree: buildTreeHelper(preorder, inorder, 2, 2, 3) (for 3, 4)
