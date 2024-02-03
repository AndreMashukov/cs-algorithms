// Given a binary search tree t, find the kth smallest element in it.

function solution (t, k) {
  const stack = []
  let current = t

  while (current || stack.length) {
    // goes down the left side of the tree
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop()
    k--

    if (k === 0) {
      return current.value
    }
    // moves to the right child of the current node
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
