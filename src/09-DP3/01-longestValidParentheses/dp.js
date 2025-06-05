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
        // Case 2: The previous character is also a closing parenthesis, like "...))".
        // We look for a matching '(' for the current ')'.
        // dp[i-1] is the length of the valid parentheses ending at s[i-1].
        // So, s[i - dp[i-1] - 1] is the character before that valid segment.
        // dp[i - dp[i-1] - 2] = dp[5 - 2 - 2] = dp[1] = 2
        // If s[i - dp[i-1] - 1] is '(', it matches the current s[i] = ')'.
        // The length is dp[i-1] (for the inner valid segment) + 2 (for the outer matching pair "())".
        // Plus, if there were valid parentheses before this entire new segment, add their length.
        // The character before this entire segment is at index i - dp[i-1] - 2.
        dp[i] =
          dp[i - 1] + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
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
