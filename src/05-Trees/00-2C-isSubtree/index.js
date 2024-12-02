// Given two binary trees t1 and t2,
// determine whether the second tree is a subtree of the first tree
// Write a separate isEqual function for comparing whether two trees are identical.
// Then, for each node v in the tree t1, check if isEqual(v, t2). You can use depth-first search for this.

const isSameTree = (t1, t2) => {
  if (!t1 || !t2) {
    // if both are null, they are the same tree (base case)
    return t1 === t2
  }

  // root value is different: not same tree
  if (t1.value !== t2.value) {
    return false
  }

  return isSameTree(t1.left, t2.left) && isSameTree(t1.right, t2.right)
}

const isSubtree = (t1, t2) => {
  if (!t1) {
    return !t2
  }

  if (isSameTree(t1, t2)) {
    return true
  }

  return isSubtree(t1.left, t2) || isSubtree(t1.right, t2)
}

function solution (t1, t2) {
  if (!t1) {
    return !t2
  }

  // check if t2 is a subtree of t1 or if t2 is a subtree of t1's left or right subtree
  return isSubtree(t1, t2) || solution(t1.left, t2) || solution(t1.right, t2)
}
