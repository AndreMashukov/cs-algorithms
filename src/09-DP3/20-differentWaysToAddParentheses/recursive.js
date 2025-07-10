// 241. Different Ways to Add Parentheses
// https://leetcode.com/problems/different-ways-to-add-parentheses/description/
// Problem Description:
// Given a string expression of numbers and operators, return all possible results from computing
// all the different possible ways to group numbers and operators. You may return the answer in any order.
//
// The test cases are generated such that the output values fit in a 32-bit integer and the number
// of different results does not exceed 10^4.
//
// Example 1:
// Input: expression = "2-1-1"
// Output: [0,2]
// Explanation:
// ((2-1)-1) = 0
// (2-(1-1)) = 2
//
// Example 2:
// Input: expression = "2*3-4*5"
// Output: [-34,-14,-10,-10,10]
// Explanation:
// (2*(3-(4*5))) = -34
// ((2*3)-(4*5)) = -14
// ((2*(3-4))*5) = -10
// (2*((3-4)*5)) = -10
// (((2*3)-4)*5) = 10
//
// Constraints:
// 1 <= expression.length <= 20
// expression consists of digits and the operator '+', '-', and '*'.
// All the integer values in the input expression are in the range [0, 99].

/**
 * @param {string} expression
 * @return {number[]}
 */
function diffWaysToCompute_dfs(expression) {
  // Memoization map to store results for subexpressions
  // Key: substring of expression, Value: array of possible results
  const memo = new Map();
  
  // Helper function to check if a string is a pure number
  const isNumber = (str) => {
    return /^\d+$/.test(str);
  };
  
  // Recursive function to compute all possible results for an expression
  const dfs = (expr) => {
    // Check if we've already computed this subexpression
    if (memo.has(expr)) {
      return memo.get(expr);
    }
    
    // Base case: if the expression is just a number, return it
    if (isNumber(expr)) {
      const result = [parseInt(expr)];
      memo.set(expr, result);
      return result;
    }
    
    // Array to store all possible results for this expression
    const results = [];
    
    // Try splitting the expression at each operator
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      
      // If current character is an operator
      if (char === '+' || char === '-' || char === '*') {
        // Split expression into left and right parts
        const leftExpr = expr.substring(0, i);
        const rightExpr = expr.substring(i + 1);
        
        // Recursively compute all possible results for left and right parts
        const leftResults = dfs(leftExpr);
        const rightResults = dfs(rightExpr);
        
        // Combine results from left and right using the current operator
        for (const left of leftResults) {
          for (const right of rightResults) {
            let result;
            
            // Apply the operator to combine left and right values
            if (char === '+') {
              result = left + right;
            } else if (char === '-') {
              result = left - right;
            } else if (char === '*') {
              result = left * right;
            }
            
            // Add the computed result to our results array
            results.push(result);
          }
        }
      }
    }
    
    // Memoize the results for this expression
    memo.set(expr, results);
    return results;
  };
  
  // Start the recursive computation
  return dfs(expression);
}

// Example Usage:
console.log(diffWaysToCompute_dfs("2-1-1")); // Expected: [0, 2] (order may vary)
console.log(diffWaysToCompute_dfs("2*3-4*5")); // Expected: [-34, -14, -10, -10, 10] (order may vary)
console.log(diffWaysToCompute_dfs("11")); // Expected: [11]
console.log(diffWaysToCompute_dfs("2+3*4")); // Expected: [14, 20] (order may vary)