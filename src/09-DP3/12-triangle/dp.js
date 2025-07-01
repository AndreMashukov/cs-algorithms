// Problem: Triangle
// LeetCode URL: https://leetcode.com/problems/triangle/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given a triangle array, return the minimum path sum from top to bottom.
// For each step, you may move to an adjacent number of the row below. More formally, 
// if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

/**
 * @param {number[][]} triangle
 * @return {number}
 */
function minimumTotal_dp(triangle) {
  const n = triangle.length;
  
  // Initialize DP array with same dimensions as triangle
  // dp[i][j] represents minimum path sum from top to position (i, j)
  const dp = Array(n).fill(null).map(() => Array(triangle[triangle.length - 1].length).fill(Infinity));
  
  // Base case: first element (top of triangle)
  dp[0][0] = triangle[0][0];
  
  // Fill the DP table row by row from top to bottom
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      // For each position (i, j), we can come from two possible previous positions:
      // 1. From (i-1, j-1) - diagonal move from previous row
      // 2. From (i-1, j) - direct move down from previous row
      
      // Check if we can come from diagonal position (i-1, j-1)
      if (j > 0 && dp[i - 1][j - 1] !== Infinity) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1] + triangle[i][j]);
      }
      
      // Check if we can come from direct position (i-1, j)
      if (j < triangle[i - 1].length && dp[i - 1][j] !== Infinity) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + triangle[i][j]);
      }
    }
  }
  
  // Find minimum value in the last row (bottom of triangle)
  let result = Infinity;
  for (let j = 0; j < triangle[n - 1].length; j++) {
    result = Math.min(result, dp[n - 1][j]);
  }
  
  return result;
}

// Example Usage:
console.log(minimumTotal_dp([[2],[3,4],[6,5,7],[4,1,8,3]])); // Expected: 11
console.log(minimumTotal_dp([[-10]])); // Expected: -10
console.log(minimumTotal_dp([[1],[2,3]])); // Expected: 3
console.log(minimumTotal_dp([[1],[2,3],[4,5,6]])); // Expected: 7