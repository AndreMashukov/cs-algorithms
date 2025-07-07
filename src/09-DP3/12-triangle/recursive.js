// 120. Triangle
// https://leetcode.com/problems/triangle/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given a triangle array, return the minimum path sum from top to bottom.
// For each step, you may move to an adjacent number of the row below. More formally, 
// if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.
//
// Example 1:
// Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// Output: 11
// Explanation: The triangle looks like:
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
//
// Example 2:
// Input: triangle = [[-10]]
// Output: -10
//
// Constraints:
// 1 <= triangle.length <= 200
// triangle[0].length == 1
// triangle[i].length == triangle[i - 1].length + 1
// -10^4 <= triangle[i][j] <= 10^4

/**
 * @param {number[][]} triangle
 * @return {number}
 */
function minimumTotal_dfs(triangle) {
  // Initialize memoization map to store computed results
  const memo = new Map();
  
  // Helper function to perform DFS with memoization
  const dfs = (row, col) => {
    // Create unique key for current position (row, col)
    const key = `${row}-${col}`;
    
    // If we've already computed this subproblem, return cached result
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Base case: if we're at the last row, return the current element
    if (row === triangle.length - 1) {
      return triangle[row][col];
    }
    
    // Recursive case: compute minimum path from current position
    // We can move to (row+1, col) or (row+1, col+1)
    const moveDown = dfs(row + 1, col);        // Move to same column in next row
    const moveDiagonal = dfs(row + 1, col + 1); // Move to next column in next row
    
    // The minimum path sum from current position is current value plus minimum of two choices
    const result = triangle[row][col] + Math.min(moveDown, moveDiagonal);
    
    // Store result in memoization map to avoid recomputation
    memo.set(key, result);
    
    return result;
  };
  
  // Start DFS from top of triangle (position 0, 0)
  return dfs(0, 0);
}

// Example Usage:
console.log(minimumTotal_dfs([[2],[3,4],[6,5,7],[4,1,8,3]])); // Expected: 11
console.log(minimumTotal_dfs([[-10]])); // Expected: -10
console.log(minimumTotal_dfs([[1],[2,3]])); // Expected: 3
console.log(minimumTotal_dfs([[1],[2,3],[4,5,6]])); // Expected: 7