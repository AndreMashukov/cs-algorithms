// Given two binary trees t1 and t2,
// determine whether the second tree is a subtree of the first tree
// Write a separate isSameTree function for comparing whether two trees are identical.
// Then, for each node v in the tree t1, check if isSameTree(v, t2). You can use depth-first search for this.

const isSameTree = (t1, t2) => {
  if (!t1 || !t2) {
    // if both are null, they are the same tree (base case)
    return t1 === t2
  }

  // root value is different: not same tree
  if (t1.value !== t2.value) {
    return false
  }

  // recursively check if left and right subtrees are the same
  return isSameTree(t1.left, t2.left) && isSameTree(t1.right, t2.right)
}

const isSubtree = (t1, t2) => {
  if (!t1) {
    // if t1 is null, t2 must also be null to be a subtree
    return !t2
  }

  // if the trees are the same, t2 is a subtree of t1
  if (isSameTree(t1, t2)) {
    return true
  }

  // recursively check if t2 is a subtree of either the left or right subtree of t1
  return isSubtree(t1.left, t2) || isSubtree(t1.right, t2)
}
