// Problem: 44. Wildcard Matching
// LeetCode URL: https://leetcode.com/problems/wildcard-matching/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for 'ానా' and '*'.
// '?' Matches any single character.
// '*' Matches any sequence of characters (including the empty sequence).
// The matching should cover the entire input string (not partial).
//
// Example 1:
// Input: s = "aa", p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".
//
// Example 2:
// Input: s = "aa", p = "*"
// Output: true
// Explanation: '*' matches any sequence.
//
// Example 3:
// Input: s = "cb", p = "?a"
// Output: false
// Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
//
// Constraints:
// 0 <= s.length, p.length <= 2000
// s contains only lowercase English letters.
// p contains only lowercase English letters, '?' or '*'.

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatchWildcard_dfs(s, p) {
  const sLen = s.length; // Length of the input string.
  const pLen = p.length; // Length of the pattern string.
  const memo = new Map(); // Memoization table to store results of subproblems.

  // Helper DFS function with memoization
  // i: current index in string s
  // j: current index in pattern p
  function dfs(i, j) {
    const key = `${i},${j}`; // Create a unique key for the memoization table.
    if (memo.has(key)) {
      // If the result for this state (i, j) is already computed, return it.
      return memo.get(key);
    }

    // Base case 1: Pattern is exhausted.
    if (j === pLen) {
      // If string is also exhausted, it's a match. Otherwise, it's not.
      const result = i === sLen;
      memo.set(key, result); // Store and return the result.
      return result;
    }

    // Base case 2: String is exhausted, but pattern is not.
    if (i === sLen) {
      // If the rest of the pattern consists only of '*' characters that can match an empty sequence.
      for (let k = j; k < pLen; k++) {
        if (p[k] !== '*') {
          // If any non-'*' character is found.
          memo.set(key, false); // Store and return false.
          return false;
        }
      }
      memo.set(key, true); // All remaining are '*'s, store and return true.
      return true;
    }

    let ans = false; // Initialize the answer for the current state.

    // If current pattern character is '*'
    if (p[j] === '*') {
      // Option 1: '*' matches an empty sequence in s.
      //  So, move to the next pattern character (j+1),
      //  string index i remains.
      // Option 2: '*' matches one or more characters in s.
      //  So, move to the next string character (i+1),
      //  pattern index j remains (as '*' can match multiple).
      ans = dfs(i, j + 1) || dfs(i + 1, j);
    }
    // If current pattern character is '?' or matches the current string character
    else if (p[j] === '?' || s[i] === p[j]) {
      // Move to the next characters in both string and pattern.
      ans = dfs(i + 1, j + 1);
    }
    // Characters do not match, and pattern is not a wildcard.
    else {
      ans = false;
    }

    memo.set(key, ans); // Store the computed answer for this state.
    return ans; // Return the answer.
  }

  return dfs(0, 0); // Start DFS from the beginning of both string and pattern.
}

// Example Usage:
// console.log(isMatchWildcard_dfs("aa", "a"));       // Output: false
// console.log(isMatchWildcard_dfs("aa", "*"));        // Output: true
// console.log(isMatchWildcard_dfs("cb", "?a"));      // Output: false
// console.log(isMatchWildcard_dfs("adceb", "*a*b")); // Output: true
// console.log(isMatchWildcard_dfs("acdcb", "a*c?b")); // Output: false
// console.log(isMatchWildcard_dfs("", "*"));         // Output: true
// console.log(isMatchWildcard_dfs("mississippi", "mis*is*p*.")); // false, last char is . not ? or *
