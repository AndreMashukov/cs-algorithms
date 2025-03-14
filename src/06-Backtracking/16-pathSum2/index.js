// https://leetcode.com/problems/path-sum-ii/description/s
// Given the root of a binary tree and an integer targetSum,
// return all root-to-leaf paths where the sum of the node values
// in the path equals targetSum.
// Each path should be returned as a list of the node values,
// not node references.

// A root-to-leaf path is a path starting from the root
// and ending at any leaf node.
// A leaf is a node with no children.

// Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// Output: [[5,4,11,2],[5,8,4,5]]
// Explanation: There are two paths whose sum equals targetSum:
// 5 + 4 + 11 + 2 = 22
// 5 + 8 + 4 + 5 = 22

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
 * @param {number} targetSum
 * @return {number[][]}
 */
const pathSum = function (root, targetSum) {
  const result = []
  const path = []

  const dfs = (node, sum) => {
    if (!node) {
      return
    }

    path.push(node.val)

    if (!node.left && !node.right && sum === node.val) {
      result.push([...path])
    }

    dfs(node.left, sum - node.val)
    dfs(node.right, sum - node.val)

    path.pop()
  };

  dfs(root, targetSum)

  return result
};
