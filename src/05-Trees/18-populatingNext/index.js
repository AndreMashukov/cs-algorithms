// 116. Populating Next Right Pointers in Each Node
// https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
// https://www.youtube.com/watch?v=U4hFQCa1Cq0
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

//      1
//    /   \
//   2     3
//  / \   / \
// 4   5 6   7

/**
 * Populates next pointers in a perfect binary tree
 * Each node's next pointer should point to the node
 * to its right on the same level
 *
 * @param {_Node} root - Root node of the perfect binary tree
 * @return {_Node} - Modified tree with next pointers set
 */
const connect = function (root) {
  // Base case: if tree is empty, return null
  if (!root) {
    return null
  }

  // Start with leftmost node at the root level
  // This will be our entry point for each level
  let leftmost = root

  // Continue until we reach a leaf level (no more left children)
  // Since it's a perfect binary tree, checking just left child is sufficient
  while (leftmost.left) {
    // Current node at this level that we're processing
    let head = leftmost

    // Process all nodes at the current level
    while (head) { // head is node 2
      // Add null checks for left and right children
      if (head.left) {
        head.left.next = head.right
      }
      
      if (head.right && head.next) {
        head.right.next = head.next.left
      }

      // Move to next node at same level using next pointer
      head = head.next // moves to node 3
    }

    // Move to the next level by going to leftmost node
    leftmost = leftmost.left
  }

  // Return the modified tree
  return root
}

// First, leftmost = root (node 1)
// Then we set head = leftmost (so head = 1)
// We process node 1 in the inner while loop
// Since node 1 has no siblings, the inner while loop ends after processing node 1
// Then we move to the next level with leftmost = leftmost.left (leftmost becomes node 2)
// In the next iteration of the outer loop, head = leftmost (head = 2)

// The key is that when we're at node 2,
// we can access node 3 through head.next
// because the parent level's connections
// were already made in the previous
// iteration of the outer while loop.

/* Initial Tree:
       1
     /   \
    2     3
   / \   / \
  4   5 6   7
*/

// connect(root);

/* After connect():
       1 -> null
     /   \
    2 ->  3 -> null
   / \   / \
  4->5->6->7 -> null
*/
