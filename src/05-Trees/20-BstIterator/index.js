// 173. Binary Search Tree Iterator
// https://leetcode.com/problems/binary-search-tree-iterator/description/

// Similar problems:
// https://leetcode.com/problems/binary-tree-preorder-traversal/description/
// https://leetcode.com/problems/binary-tree-postorder-traversal/description/

// Implement the BSTIterator class that represents an iterator
// ver the in-order traversal of a binary search tree (BST):

// BSTIterator(TreeNode root) Initializes an object of the BSTIterator class.
// The root of the BST is given as part of the constructor.
// The pointer should be initialized to a non-existent number smaller
// than any element in the BST.
// boolean hasNext() Returns true if there exists a number
// in the traversal to the right of the pointer,
// otherwise returns false.
// int next() Moves the pointer to the right,
// then returns the number at the pointer.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */

const BSTIterator = function (root) {
  this.stack = []
  this.pushLeft(root)
}

BSTIterator.prototype.pushLeft = function (node) {
  while (node) {
    this.stack.push(node)
    node = node.left
  }
}

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  const node = this.stack.pop()
  // We've already checked with hasNext, so node shouldn't be null

  // After visiting a node, we need to explore its right subtree
  if (node.right) {
    this.pushLeft(node.right)
  }

  return node.val
}

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0 // Check if the stack is not empty
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
