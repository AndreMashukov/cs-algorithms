// Problem: Longest Valid Parentheses
// https://leetcode.com/problems/longest-valid-parentheses/description/?envType=problem-list-v2&envId=dynamic-programming
// https://www.youtube.com/watch?v=VdQuwtEd10M
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
//¿
// Example 3:
// Input: s = ""
// Output: 0
//
// Constraints:
// 0 <= s.length <= 3 * 10^4
// s[i] is '(', or ')'.

/**
 * @param {string} s
 * @return {number}
 */
function longestValidParentheses_dp(s) {
  if (s.length < 2) {
    // If the string length is less than 2, no valid parentheses can be formed.
    return 0; // Return 0.
  }

  const dp = new Array(s.length).fill(0); // Initialize a DP array with zeros. dp[i] will store the length of the longest valid parentheses ending at index i.
  let maxLength = 0; // Stores the maximum length found so far.

  for (let i = 1; i < s.length; i++) {
    // Iterate through the string starting from the second character.
    if (s[i] === ')') {
      // If the current character is a closing parenthesis.
      if (s[i - 1] === '(') {
        // Case 1: The previous character is an opening parenthesis, like "...()".
        // The length of valid parentheses ending at i is 2 (for "()").
        // Plus, if there were valid parentheses before "()", add their length.
        // dp[i-2] gives the length of valid parentheses ending at index i-2.
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
        // Calculate the index of the matching '('
        // i - dp[i-1] is the start of the valid substring ending at i-1
        // Subtract 1 more to find the char before that substring
        const matchIdx = i - dp[i - 1] - 1;
        
        // Add current inner length + 2 + any valid length preceding the match
        const prevValidLen = (matchIdx - 1 >= 0) ? dp[matchIdx - 1] : 0;
        dp[i] = dp[i - 1] + prevValidLen + 2;
      }
      maxLength = Math.max(maxLength, dp[i]); // Update the overall maximum length found.
    }
  }

  console.log(dp);

  return maxLength; // Return the overall maximum length.
}

// Example Usage:
// console.log(longestValidParentheses_dp("(()")); // Expected output: 2
// console.log(longestValidParentheses_dp(")()())")); // Expected output: 4
// console.log(longestValidParentheses_dp("")); // Expected output: 0
// console.log(longestValidParentheses_dp("()(()")); // Expected output: 2
// console.log(longestValidParentheses_dp("()(()) ")); // Expected output: 6
console.log(longestValidParentheses_dp('(()(((()')); // Expected output: 2
