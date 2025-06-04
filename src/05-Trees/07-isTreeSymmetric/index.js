// 101. Symmetric Tree
// https://leetcode.com/problems/symmetric-tree/description/
// Given a binary tree t, determine whether it is symmetric around its center,
// i.e. each side mirrors the other.

//
// Binary trees are already defined with this interface:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }

// You want two pointers to go down the tree recursively,
// one for the left side and one for the right.
// When doing the comparison, compare the values of the left children
// on one side to the right children on the other, and vice-versa.

const isSymmetric = (left, right) => {
  if (!left && !right) {
    return true
  }
  // if one side is null and the other is not, then it's not symmetric
  if (!left || !right) {
    return false
  }
  return (
    left.value === right.value &&
    // compare left children on one side to right children on the other
    isSymmetric(left.left, right.right) &&
    isSymmetric(left.right, right.left)
  )
}

function solution (t) {
  if (!t) {
    return true
  }
  return isSymmetric(t.left, t.right)
}
