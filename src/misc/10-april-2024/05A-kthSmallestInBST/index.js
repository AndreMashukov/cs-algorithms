// Given a binary search tree t, find the kth smallest element in it.

function solution (t, k) {
  // top of the stack is the smallest element in the tree
  const stack = []
  let current = t

  // in-order traversal of the tree
  while (current || stack.length) {
    // goes down the left side of the tree and adds the nodes to the stack
    while (current) {
      // current node is added to the stack (and not current.left)
      stack.push(current)
      current = current.left
    }

    console.log('stack:', stack)

    current = stack.pop()
    k--

    if (k === 0) {
      return current.value
    }
    // moves to the right child of the current node and then goes down the left side of the tree
    current = current.right
  }
}

// function solution(t, k) {
//   function inOrderTraversal(node) {
//       const values = [];

//       function traverse(currentNode) {
//           if (currentNode) {
//               traverse(currentNode.left);
//               values.push(currentNode.value);
//               traverse(currentNode.right);
//           }
//       }

//       traverse(node);
//       return values;
//   }

//   const sortedValues = inOrderTraversal(t);
//   return sortedValues[k - 1];
// }

console.log(solution({
  value: 3,
  left: {
    value: 1,
    left: null,
    right: {
      value: 2,
      left: null,
      right: null
    }
  },
  right: {
    value: 5,
    left: {
      value: 4,
      left: null,
      right: null
    },
    right: {
      value: 6,
      left: null,
      right: null
    }
  }
}, 3)) // 3

//   3
//  /  \
// 1    5
//  \   / \
//   2 4   6

// stack: [3, 1]
// stack: [3, 2]
// stack: [3]

//  current = current.right
// The right subtree contains nodes that are greater than the current node
// but still need to be visited to maintain the ascending order.
