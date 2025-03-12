// 129. Sum Root to Leaf Numbers
// You are given the root of a binary tree containing digits from 0 to 9 only.

// Each root-to-leaf path in the tree represents a number.

// For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
// Return the total sum of all root-to-leaf numbers.
// Test cases are generated so that the answer
// will fit in a 32-bit integer.

// A leaf node is a node with no children.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumNumbers = function (root) {
  const dfs = (node, sum) => {
    if (!node) {
      return 0
    }

    sum = sum * 10 + node.val

    if (!node.left && !node.right) {
      return sum
    }

    return dfs(node.left, sum) + dfs(node.right, sum)
  }

  return dfs(root, 0)
}

console.log(sumNumbers({
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
})) // 25
// Explanation: The root-to-leaf path 1->2 represents the number 12.
// The root-to-leaf path 1->3 represents the number 13.
// Therefore, sum = 12 + 13 = 25.
