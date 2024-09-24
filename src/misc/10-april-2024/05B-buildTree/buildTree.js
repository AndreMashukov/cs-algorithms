const TreeNode = require('./TreeNode') // Import the TreeNode class

// You are given two integer arrays preorder and inorder.
// preorder is the preorder traversal of a binary tree
// inorder is the inorder traversal of the same tree
// Both arrays are of the same size and consist of unique values.
// Rebuild the binary tree from the preorder and inorder traversals and return its root.

// Input: preorder = [1,2,3,4], inorder = [2,1,3,4]
// Output: [1,2,3,null,null,null,4]
class Solution {
  /**
   * @param {number[]} preorder - The preorder traversal of the tree
   * @param {number[]} inorder - The inorder traversal of the tree
   * @return {TreeNode} - The root of the reconstructed binary tree
   */
  buildTree (preorder, inorder) {
    // Base case: if either array is empty, return null
    if (!preorder.length || !inorder.length) {
      return null
    }

    // The first element of preorder is the root of the tree
    const root = new TreeNode(preorder[0])
    // Find the index of the root in inorder array
    const mid = inorder.indexOf(preorder[0])
    // Recursively build the left subtree
    root.left = this.buildTree(
      preorder.slice(1, mid + 1), // Elements after the root in preorder up to the mid index
      inorder.slice(0, mid) // Elements before the root in inorder
    )
    // Recursively build the right subtree
    root.right = this.buildTree(
      preorder.slice(mid + 1), // Elements after the mid index in preorder
      inorder.slice(mid + 1) // Elements after the root in inorder
    )
    // Return the root of the tree
    return root
  }
}

const solution = new Solution() // Create an instance of the Solution class
console.log(solution.buildTree([1, 2, 3, 4], [2, 1, 3, 4])) // Test the buildTree method with example input