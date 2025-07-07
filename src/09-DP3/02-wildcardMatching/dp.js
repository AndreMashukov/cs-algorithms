// Problem: Wildcard Matching
// https://leetcode.com/problems/wildcard-matching/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*'.
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
function isMatchWildcard_dp(s, p) {
  const sLen = s.length; // Length of the input string.
  const pLen = p.length; // Length of the pattern string.

  // dp[i][j] will be true if the first i characters of s match the first j characters of p.
  const dp = Array(sLen + 1)
    .fill(null)
    .map(() => Array(pLen + 1).fill(false));

  // Base case: An empty pattern matches an empty string.
  dp[0][0] = true;

  // Base case: Handling patterns like "*", "**", "***" which can match an empty string.
  // If s is empty, p can only match if it's all '*'s or reducible to all '*'s.
  for (let j = 1; j <= pLen; j++) {
    if (p[j - 1] === '*') {
      // If pattern character is '*'
      dp[0][j] = dp[0][j - 1]; // It can match an empty string if the pattern up to j-1 could also match an empty string.
    }
  }

  // console.log(dp);
  //        ""      "*"
  // ""   [[true,  true ],  
  // "a"  [ false, false ], 
  // "a"  [ false, false ] ]

  // Fill the DP table.
  for (let i = 1; i <= sLen; i++) {
    // Iterate through the string s.
    for (let j = 1; j <= pLen; j++) {
      // Iterate through the pattern p.
      const sChar = s[i - 1]; // Current character in s (1-indexed for dp table).
      const pChar = p[j - 1]; // Current character in p (1-indexed for dp table).

      if (pChar === '*') {
        // If pattern char is '*_BUFFER', two possibilities:
        // 1. '*' matches an empty sequence: dp[i][j-1] (ignore '*' in pattern, s remains same length).
        // 2. '*' matches current sChar: dp[i-1][j] (match sChar with '*' and see if '*' can match prefix of s).
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      } else if (pChar === '?' || sChar === pChar) {
        // If pattern char is '?' (matches any char) or chars match exactly.
        // The result depends on whether the prefixes s[0...i-1] and p[0...j-1] matched.
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // Characters do not match and pattern is not a wildcard.
        dp[i][j] = false;
      }
    }
  }

  return dp[sLen][pLen]; // The result is in dp[sLen][pLen].
}

// Example Usage:
// console.log(isMatchWildcard_dp("aa", "a"));       // Output: false
console.log(isMatchWildcard_dp("aa", "*"));        // Output: true
// console.log(isMatchWildcard_dp("cb", "?a"));      // Output: false
// console.log(isMatchWildcard_dp("adceb", "*a*b")); // Output: true
// console.log(isMatchWildcard_dp("acdcb", "a*c?b")); // Output: false
// console.log(isMatchWildcard_dp("", "*"));         // Output: true
// console.log(isMatchWildcard_dp("aaa", "a*a"));     // Output: true
// console.log(isMatchWildcard_dp("mississippi", "mis*is*p*.")); // false
