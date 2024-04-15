// Given a binary tree root, a node X in the tree is named good
// if in the path from root to X there are no nodes with a value greater than X.

// Return the number of good nodes in the binary tree.

// Example 1:
// Input: root = [3,1,4,3,null,1,5]
// Output: 4
// Explanation: Nodes in blue are good.
// Root Node (3) is always a good node.
// Node 4 -> (3,4) is the maximum value in the path starting from the root.
// Node 5 -> (3,4,5) is the maximum value in the path
// Node 3 -> (3,1,3) is the maximum value in the path.

const goodNodes = (root) => {
  let count = 0

  const dfs = (node, max) => {
    if (!node) return

    if (node.val >= max) {
      count++
      max = node.val
    }

    dfs(node.left, max)
    dfs(node.right, max)
  }

  // start the dfs with the root node and the value of the root node
  dfs(root, root.val)

  return count
}

console.log(
  goodNodes({
    val: 3,
    left: { val: 1, left: { val: 3, left: null, right: null }, right: { val: 1, left: null, right: null } },
    right: { val: 4, left: null, right: { val: 5, left: null, right: null } }
  })
)
// 4

//   3
//  / \
// 1   4
// /     \
// 3       5
