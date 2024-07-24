// Given a binary search tree (BST), find the lowest common ancestor (LCA) node
// of two given nodes in the BST.
// LCA - The lowest common ancestor is defined between two nodes p and q
// as the lowest node in T that has both p and q as descendants
// Example of LCA:
// The lowest common ancestor of nodes 2 and 8 is 6
// The lowest common ancestor of nodes 2 and 4 is 2
// The lowest common ancestor of nodes 2 and 5 is 2
//        6
//       / \
//      2   8
//     / \ / \
//    0  4 7  9
//      / \
//     3   5
// Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// Output: 6

class Solution {
  /**
   * @param {TreeNode} root
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {TreeNode}
   */
  lowestCommonAncestor (root, p, q) {
    while (true) {
      if (root.val < p.val && root.val < q.val) {
        root = root.right
      } else if (root.val > p.val && root.val > q.val) {
        root = root.left
      } else {
        return root
      }
    }
  }
}
console.log(
  Solution.lowestCommonAncestor(
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
  )
)
// { val: 6, left: { val: 2, left: [Object], right: [Object] }, right: { val: 8, left: [Object], right: [Object] } }
