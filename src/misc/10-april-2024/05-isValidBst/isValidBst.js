// Given the root of a binary tree,
// determine if it is a valid binary search tree (BST).

const isValidBst = (root) => {
  const dfs = (node, min, max) => {
    if (!node) return true

    // if the current node's value is less than or equal to the min value
    // or greater than or equal to the max value, return false
    if (node.val <= min || node.val >= max) return false

    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max)
  }

  return dfs(root, -Infinity, Infinity)
}
// Time: O(n)
// Space: O(n)

// Test case 1
console.log(
  isValidBst({
    val: 2,
    left: { val: 1, left: null, right: null },
    right: { val: 3, left: null, right: null }
  })
)
