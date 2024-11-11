// 316. Remove Duplicate Letters
// https://leetcode.com/problems/remove-duplicate-letters/
// https://www.lintcode.com/problem/834/
// https://www.youtube.com/watch?v=j313ttNJjo0

// Given a string s, remove duplicate letters so that every letter appears once  
// and only once. You must make sure your result is
// the smallest in lexicographical order
// among all possible results.

// Example 1:

// Input: s = "bcabc"
// Output: "abc"
// Example 2:

// Input: s = "cbacdcbc"
// Output: "acdb"

/**
 * @param {string} s
 * @return {string}
 */
const removeDuplicateLetters = function (s) {
  const stack = []; // Stack to keep track of the result characters
  const seen = new Set(); // Set to keep track of characters already in the stack
  const lastOccurrence = {}; // Map to store the last occurrence index of each character

  // Populate the lastOccurrence map with the last index of each character
  for (let i = 0; i < s.length; i++) {
    lastOccurrence[s[i]] = i;
  }

  // Iterate through the string
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // If the character is not already in the stack
    if (!seen.has(char)) {
      // While the stack is not empty, and the current character is smaller than the top character of the stack,
      // and the top character of the stack will appear later in the string
      while (
        stack.length > 0 &&
        char < stack[stack.length - 1] &&
        i < lastOccurrence[stack[stack.length - 1]]
      ) {
        seen.delete(stack.pop()); // Remove the top character from the stack and the seen set
      }
      seen.add(char); // Add the current character to the seen set
      stack.push(char); // Push the current character onto the stack
    }
  }

  return stack.join(''); // Join the characters in the stack to form the result string
};
