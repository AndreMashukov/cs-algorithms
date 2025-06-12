// 95. Unique Binary Search Trees II
// https://leetcode.com/problems/unique-binary-search-trees-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an integer n, return all the structurally unique BST's (binary search trees), 
// which has exactly n nodes of unique values from 1 to n. Return the answer in any order.
//
// Example 1:
// Input: n = 3
// Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
//
// Example 2:
// Input: n = 1
// Output: [[1]]
//
// Constraints:
// - 1 <= n <= 8

// Definition for a binary tree node
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
function generateTrees_dfs(n) {
  // Handle edge case where n is 0
  if (n === 0) return [];
  
  // Memoization map to store computed results for ranges
  const memo = new Map();
  
  // Helper function to generate all unique BSTs for values in range [start, end]
  const dfs = (start, end) => {
    // Create unique key for current range
    const key = `${start},${end}`;
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Base case: invalid range returns array with null (empty tree)
    if (start > end) {
      memo.set(key, [null]);
      return [null];
    }
    
    // Base case: single node range returns array with one tree
    if (start === end) {
      const result = [new TreeNode(start)];
      memo.set(key, result);
      return result;
    }
    
    const allTrees = [];
    
    // Try each value in range as root
    for (let root = start; root <= end; root++) {
      // Generate all possible left subtrees with values < root
      const leftTrees = dfs(start, root - 1);
      
      // Generate all possible right subtrees with values > root
      const rightTrees = dfs(root + 1, end);
      
      // Combine each left subtree with each right subtree
      for (let leftTree of leftTrees) {
        for (let rightTree of rightTrees) {
          // Create new root node and attach left and right subtrees
          const rootNode = new TreeNode(root);
          rootNode.left = leftTree;
          rootNode.right = rightTree;
          allTrees.push(rootNode);
        }
      }
    }
    
    // Cache and return all generated trees for this range
    memo.set(key, allTrees);
    return allTrees;
  };
  
  // Generate all BSTs using values from 1 to n
  return dfs(1, n);
}

// Example Usage:
console.log(generateTrees_dfs(1)); // [[1]]
console.log(generateTrees_dfs(2)); // [[1,null,2],[2,1]]
console.log(generateTrees_dfs(3)); // 5 different tree structures