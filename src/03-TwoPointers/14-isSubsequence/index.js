// 392. Is Subsequence
// https://leetcode.com/problems/is-subsequence/description/

// Given two strings s and t, return true if s is a subsequence of t,
// or false otherwise.

// A subsequence of a string is a new string that is formed
// from the original string by deleting some (can be none)
//  of the characters without disturbing the relative positions
// of the remaining characters. (i.e., "ace" is a subsequence
// of "abcde" while "aec" is not).

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = function (s, t) {
  let i = 0
  let j = 0

  // Move through t, advancing i only when characters match
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++
    }
    j++
  }

  return i === s.length
}

console.log(isSubsequence('abc', 'ahbgdc')) // Expected output: true
