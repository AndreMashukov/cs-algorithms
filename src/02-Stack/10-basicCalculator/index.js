// 224. Basic Calculator
// https://leetcode.com/problems/basic-calculator/

// Given a string s representing a valid expression, implement a basic calculator 
// to evaluate it, 
// and return the result of the evaluation.
// Note: You are not allowed to use any built-in function 
// which evaluates strings as mathematical expressions, such as eval().

 

// Example 1:

// Input: s = "1 + 1"
// Output: 2
// Example 2:

// Input: s = " 2-1 + 2 "
// Output: 3
// Example 3:

// Input: s = "(1+(4+5+2)-3)+(6+8)"
// Output: 23

/**
 * @param {string} s
 * @return {number}
 */
const calculate = function(s) {
  const stack = []; // Stack to keep track of results and signs
  let num = 0; // Current number being processed
  let sign = 1; // Current sign (+1 or -1)
  let result = 0; // Current result

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!isNaN(char) && char !== ' ') {
      // If the character is a digit, build the current number
      num = num * 10 + Number(char);
    } else if (char === '+') {
      // If the character is '+', add the current number to the result
      result += sign * num;
      num = 0; // Reset the current number
      sign = 1; // Set the sign to positive
    } else if (char === '-') {
      // If the character is '-', add the current number to the result
      result += sign * num;
      num = 0; // Reset the current number
      sign = -1; // Set the sign to negative
    } else if (char === '(') {
      // If the character is '(', push the current result and sign onto the stack
      stack.push(result);
      stack.push(sign);
      result = 0; // Reset the result for the new sub-expression
      sign = 1; // Reset the sign for the new sub-expression
    } else if (char === ')') {
      // If the character is ')', complete the current sub-expression
      result += sign * num;
      num = 0; // Reset the current number
      result *= stack.pop(); // Multiply the result by the sign before the parenthesis
      result += stack.pop(); // Add the result before the parenthesis
    }
  }
  // Add the last number to the result
  return result + sign * num;
};