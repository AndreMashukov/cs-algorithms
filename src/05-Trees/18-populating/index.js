// 116. Populating Next Right Pointers in Each Node
// You are given a perfect binary tree where all leaves are on the same level,
//  and every parent has two children. The binary tree has the following definition:

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

// Initially, all next pointers are set to NULL.

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
const connect = function (root) {
  if (!root) {
    return null
  }

  let leftmost = root

  while (leftmost.left) {
    let head = leftmost

    while (head) {
      head.left.next = head.right

      if (head.next) {
        head.right.next = head.next.left
      }

      head = head.next
    }

    leftmost = leftmost.left
  }

  return root
};
