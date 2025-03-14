// 437. Path Sum III
// https://leetcode.com/problems/path-sum-iii/description
// https://www.youtube.com/watch?v=VDTZiggKlAE

// Given the root of a binary tree and an integer targetSum,
// return the number of paths where the sum of the values
// along the path equals targetSum.

// The path does not need to start or end at the root or a leaf,
// but it must go downwards
// (i.e., traveling only from parent nodes to child nodes).

const pathSum = function (root, targetSum) {
  if (!root) return 0

  const pathSumFrom = (node, targetSum) => {
    if (!node) return 0

    return (
      (node.val === targetSum ? 1 : 0) +
      pathSumFrom(node.left, targetSum - node.val) +
      pathSumFrom(node.right, targetSum - node.val)
    )
  }

  return (
    pathSumFrom(root, targetSum) +
    pathSum(root.left, targetSum) +
    pathSum(root.right, targetSum)
  )
}
