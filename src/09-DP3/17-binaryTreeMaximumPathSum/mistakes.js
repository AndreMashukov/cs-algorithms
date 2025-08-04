/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxPathSum(root) {
        const memo = new Map();
        let max = -Infinity;

        const preorder = (node) => {
            if (!node) {
                return 0
            }
            if (memo.has(node)) {
                return memo.get(node)
            }
            const left = Math.max(0, preorder(node.left));
            const right = Math.max(0, preorder(node.right));

            const maxThroughNode = node.val + left + right;
            max = Math.max(max, maxThroughNode)

            const maxDown = node.val + Math.max(left, right);

            memo.set(node, maxDown)
            return maxDown
        }
    }
}
