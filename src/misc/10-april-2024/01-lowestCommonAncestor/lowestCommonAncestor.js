// Given a binary search tree (BST), find the lowest common ancestor (LCA) node
// of two given nodes in the BST.

const lowestCommonAncestor = (root, p, q) => {
  // If the value of p is less than the value of the root
  // and the value of q is less than the value of the root,
  if (p.val < root.val && q.val < root.val) {
    // Recursively call the function with the left child of the root
    return lowestCommonAncestor(root.left, p, q)
  // If the value of p is greater than the value of the root
  // and the value of q is greater than the value of the root,
  } else if (p.val > root.val && q.val > root.val) {
    // Recursively call the function with the right child of the root
    return lowestCommonAncestor(root.right, p, q)
  } else {
    return root
  }
}

console.log(lowestCommonAncestor(
  {
    val: 6,
    left: {
      val: 2,
      left: { val: 0, left: null, right: null },
      right: {
        val: 4,
        left: { val: 3, left: null, right: null },
        right: { val: 5, left: null, right: null }
      }
    },
    right: {
      val: 8,
      left: { val: 7, left: null, right: null },
      right: { val: 9, left: null, right: null }
    }
  },
  { val: 7, left: null, right: null },
  { val: 9, left: null, right: null }
))
// { val: 6, left: { val: 2, left: [Object], right: [Object] }, right: { val: 8, left: [Object], right: [Object] } }
