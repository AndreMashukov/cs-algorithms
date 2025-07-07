// Problem: Pascal's Triangle
// LeetCode URL: https://leetcode.com/problems/pascals-triangle/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an integer numRows, return the first numRows of Pascal's triangle.
// In Pascal's triangle, each number is the sum of the two numbers directly above it.

/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate_dp(numRows) {
  // Initialize result array to store all rows of Pascal's triangle
  const triangle = [];
  
  // Generate each row from 0 to numRows-1
  for (let row = 0; row < numRows; row++) {
    // Create current row array with initial size of (row + 1)
    const currentRow = Array(row + 1);
    
    // First and last elements of each row are always 1
    currentRow[0] = 1;
    currentRow[row] = 1;
    
    // Fill middle elements using DP relationship with previous row
    for (let col = 1; col < row; col++) {
      // Each element equals sum of two elements above it in previous row
      // triangle[row-1][col-1] + triangle[row-1][col]
      const leftParent = triangle[row - 1][col - 1];
      const rightParent = triangle[row - 1][col];
      currentRow[col] = leftParent + rightParent;
    }
    
    // Add completed row to the triangle
    triangle.push(currentRow);
  }
  
  // Return the complete Pascal's triangle
  return triangle;
}

// Example Usage:
console.log(generate_dp(1)); // [[1]]
console.log(generate_dp(2)); // [[1],[1,1]]
console.log(generate_dp(3)); // [[1],[1,1],[1,2,1]]
console.log(generate_dp(5)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]