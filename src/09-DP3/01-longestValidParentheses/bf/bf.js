// Problem: Longest Valid Parentheses
// LeetCode URL: https://leetcode.com/problems/longest-valid-parentheses/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.
//
// Example 1:
// Input: s = "(()"
// Output: 2
// Explanation: The longest valid parentheses substring is "()".
//
// Example 2:
// Input: s = ")()())"
// Output: 4
// Explanation: The longest valid parentheses substring is "()()".
//
// Example 3:
// Input: s = ""
// Output: 0
//
// Constraints:
// 0 <= s.length <= 3 * 10^4
// s[i] is '(', or ')'.

// Brute force approach
/**
 * @param {string} s
 * @return {number}
 */
function longestValidParentheses(s) {
  let maxLength = 0; // Stores the maximum length found so far.

  // Helper function to check if a substring is valid.
  function isValid(str) {
    let balance = 0; // Counter for parentheses balance.
    for (let i = 0; i < str.length; i++) {
      // Iterate through the substring.
      if (str[i] === '(') {
        // If '(', increment balance.
        balance++;
      } else {
        // If ')', decrement balance.
        balance--;
      }
      if (balance < 0) {
        // If balance drops below zero, it's invalid.
        return false;
      }
    }
    return balance === 0; // Valid if balance is zero at the end.
  }

  function findLongest(index, currentString) {
    // Base case: if index reaches the end of the string 's'
    if (index === s.length) {
      if (isValid(currentString)) {
        // Check if the accumulated string is valid
        maxLength = Math.max(maxLength, currentString.length); // Update maxLength if it is
      }
      // Even if valid, or not, we might have found a valid substring *within* currentString earlier.
      // This specific check is for the *entire* currentString from a particular starting point.
      return;
    }

    // Option 1: Include the current character s[index] in the current substring
    // This path is implicitly handled by the outer loops that generate substrings.
    // The core idea of this "DFS-like" approach is to check every possible substring.

    // Option 2: Start a new substring from s[index] or continue.
    // This is also handled by the outer loops.
  }

  // Iterate over all possible start points of a substring.
  for (let i = 0; i < s.length; i++) {
    // Iterate over all possible end points of a substring.
    for (let j = i; j < s.length; j++) {
      const sub = s.substring(i, j + 1); // Extract the substring.
      // No explicit recursive call here as in traditional graph DFS.
      // Instead, we are "exploring" each substring.
      if (isValid(sub)) {
        // Check if the current substring is valid.
        maxLength = Math.max(maxLength, sub.length); // If valid, update maxLength.
      }
    }
  }

  return maxLength; // Return the overall maximum length found.
}

// Example Usage:
// console.log(longestValidParentheses_dfs("(()")); // Expected output: 2
// console.log(longestValidParentheses_dfs(")()())")); // Expected output: 4
// console.log(longestValidParentheses_dfs("")); // Expected output: 0
// console.log(longestValidParentheses_dfs("()(()")); // Expected output: 2
// console.log(longestValidParentheses_dfs("(()(((()")); // Expected output: 2 (the first "(()") has "()"
