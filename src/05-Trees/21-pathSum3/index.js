// 437. Path Sum III
// https://leetcode.com/problems/path-sum-iii/description
// https://www.youtube.com/watch?v=VDTZiggKlAE

// Given the root of a binary tree and an integer targetSum,
// return the number of paths where the sum of the values
// along the path equals targetSum.

// The path does not need to start or end at the root or a leaf,
// but it must go downwards
// (i.e., traveling only from parent nodes to child nodes).

/**
 * Finds the number of paths in a binary tree that sum to targetSum
 * Uses a prefix sum approach with a hash map for O(n) time complexity
 *
 * @param {TreeNode} root - Root of the binary tree
 * @param {number} targetSum - Target sum to find
 * @return {number} - Number of paths that sum to targetSum
 */
const pathSum = function (root, targetSum) {
  // Counter for valid paths
  let count = 0
  // Map to store prefix sums and their frequencies
  const map = new Map()

  /**
   * DFS helper function to traverse the tree and count paths
   * @param {TreeNode} node - Current node being processed
   * @param {number} sum - Running sum from the root to current node
   */
  const dfs = (node, sum) => {
    if (!node) return

    // Add current node's value to the running sum
    sum += node.val

    // Case 1: Path starts from root to current node equals targetSum
    if (sum === targetSum) {
      count++
    }

    // Case 2: Path starts from somewhere in the middle
    // If we've seen a prefix sum equal to (sum - targetSum),
    // then there's a subpath that sums to targetSum
    count += map.get(sum - targetSum) || 0

    // Add the current prefix sum to the map or increment its frequency
    map.set(sum, (map.get(sum) || 0) + 1)

    // Recursively process left and right children
    dfs(node.left, sum)
    dfs(node.right, sum)

    // Backtracking: remove the current sum from path when going up
    // This ensures we only count paths going downward
    map.set(sum, map.get(sum) - 1)
  }

  // Start DFS from root with initial sum of 0
  dfs(root, 0)

  return count
}
