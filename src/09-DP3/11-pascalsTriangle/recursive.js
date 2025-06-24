// 118. Pascal's Triangle
// https://leetcode.com/problems/pascals-triangle/description/?envType=problem-list-v2&envId=dynamic-programming
// https://www.youtube.com/watch?v=nPVEaB3AjUM
// Problem Description:
// Given an integer numRows, return the first numRows of Pascal's triangle.
// In Pascal's triangle, each number is the sum of the two numbers directly above it.
//
// Example 1:
// Input: numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
//
// Example 2:
// Input: numRows = 1
// Output: [[1]]
//
// Constraints:
// - 1 <= numRows <= 30

/**
 * @param {number} numRows
 * @return {number[][]}
 */
function generate_dfs(numRows) {
  // Memoization map to cache computed triangle rows
  const memo = new Map();
  
  // Helper function to generate Pascal's triangle recursively with memoization
  const dfs = (rowIndex) => {
    // Check if this row is already computed and cached
    if (memo.has(rowIndex)) {
      return memo.get(rowIndex);
    }
    
    // Base case: first row (index 0) contains only [1]
    if (rowIndex === 0) {
      const result = [1];
      memo.set(rowIndex, result);
      return result;
    }
    
    // Base case: second row (index 1) contains [1, 1]
    if (rowIndex === 1) {
      const result = [1, 1];
      memo.set(rowIndex, result);
      return result;
    }
    
    // Recursive case: compute current row using previous row
    // Get the previous row by recursive call
    const prevRow = dfs(rowIndex - 1);
    
    // Create current row starting and ending with 1
    const currentRow = [1];
    
    // Fill middle elements by summing adjacent elements from previous row
    for (let i = 1; i < rowIndex; i++) {
      // Each element is sum of two elements above it in previous row
      const leftParent = prevRow[i - 1];
      const rightParent = prevRow[i];
      currentRow.push(leftParent + rightParent);
    }
    
    // Add the final 1 to complete the row
    currentRow.push(1);
    
    // Cache the computed row and return it
    memo.set(rowIndex, currentRow);
    return currentRow;
  };
  
  // Generate all rows from 0 to numRows-1 and collect them
  const result = [];
  for (let i = 0; i < numRows; i++) {
    result.push(dfs(i));
  }
  
  return result;
}

// Example Usage:
console.log(generate_dfs(1)); // [[1]]
console.log(generate_dfs(2)); // [[1],[1,1]]
console.log(generate_dfs(3)); // [[1],[1,1],[1,2,1]]
console.log(generate_dfs(5)); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]