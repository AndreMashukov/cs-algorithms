// 28. Find the Index of the First Occurrence in a String
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
// Given two strings needle and haystack, return the index
// of the first occurrence of needle in haystack,
// or -1 if needle is not part of haystack.

// Example 1:
// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.
// Example 2:

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = function (haystack, needle) {
  // If needle is an empty string, return 0
  if (needle === '') return 0

  // Iterate through the haystack
  for (let i = 0; i < haystack.length; i++) {
    // If the current character in haystack matches the first character of needle
    if (haystack[i] === needle[0]) {
      let j = 0
      // Check if the subsequent characters match the needle
      while (j < needle.length && haystack[i + j] === needle[j]) {
        j++
      }
      // If the entire needle is found, return the starting index
      if (j === needle.length) return i
    }
  }

  // If needle is not found in haystack, return -1
  return -1
}

// Example usage:
console.log(strStr('hello', 'll')) // Expected output: 2
console.log(strStr('aaaaa', 'bba')) // Expected output: -1
console.log(strStr('', '')) // Expected output: 0
