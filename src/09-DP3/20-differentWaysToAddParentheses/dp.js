// Problem: Different Ways to Add Parentheses
// LeetCode URL: https://leetcode.com/problems/different-ways-to-add-parentheses/description/
// Problem Description:
// Given a string expression of numbers and operators, return all possible results from computing
// all the different possible ways to group numbers and operators. You may return the answer in any order.

/**
 * @param {string} expression
 * @return {number[]}
 */
function diffWaysToCompute_dp(expression) {
  // First, parse the expression to separate numbers and operators
  const numbers = [];
  const operators = [];
  let currentNum = "";
  
  // Parse the expression character by character
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    
    if (char === '+' || char === '-' || char === '*') {
      // Found an operator, save the current number and the operator
      numbers.push(parseInt(currentNum));
      operators.push(char);
      currentNum = "";
    } else {
      // Building the current number
      currentNum += char;
    }
  }
  // Don't forget the last number
  numbers.push(parseInt(currentNum));
  
  const n = numbers.length;
  
  // dp[i][j] will store all possible results for the subexpression
  // from numbers[i] to numbers[j] (inclusive)
  const dp = Array(n).fill(null).map(() => Array(n).fill(null).map(() => []));
  
  // Base case: single numbers
  // Each number by itself has only one possible result
  for (let i = 0; i < n; i++) {
    dp[i][i] = [numbers[i]];
  }
  
  // Fill the DP table for increasingly larger subexpressions
  // length represents the number of numbers in the subexpression
  for (let length = 2; length <= n; length++) {
    // i is the starting index of the subexpression
    for (let i = 0; i <= n - length; i++) {
      // j is the ending index of the subexpression
      const j = i + length - 1;
      
      // Try all possible positions to split the subexpression
      // k is the position of the operator that splits left and right
      for (let k = i; k < j; k++) {
        // Get all possible results for left part (from i to k)
        const leftResults = dp[i][k];
        // Get all possible results for right part (from k+1 to j)
        const rightResults = dp[k + 1][j];
        // The operator between left and right parts
        const operator = operators[k];
        
        // Combine all possible results from left and right
        for (const left of leftResults) {
          for (const right of rightResults) {
            let result;
            
            // Apply the operator
            if (operator === '+') {
              result = left + right;
            } else if (operator === '-') {
              result = left - right;
            } else if (operator === '*') {
              result = left * right;
            }
            
            // Add this result to dp[i][j]
            dp[i][j].push(result);
          }
        }
      }
    }
  }
  
  // Return all possible results for the entire expression
  return dp[0][n - 1];
}

// Example Usage:
console.log(diffWaysToCompute_dp("2-1-1")); // Expected: [0, 2] (order may vary)
console.log(diffWaysToCompute_dp("2*3-4*5")); // Expected: [-34, -14, -10, -10, 10] (order may vary)
console.log(diffWaysToCompute_dp("11")); // Expected: [11]
console.log(diffWaysToCompute_dp("2+3*4")); // Expected: [14, 20] (order may vary)