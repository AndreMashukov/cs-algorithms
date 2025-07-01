// 87. Scramble String
// https://leetcode.com/problems/scramble-string/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// We can scramble a string s to get a string t using the following algorithm:
//
// 1. If the length of the string is 1, stop.
// 2. If the length of the string is > 1, do the following:
//    - Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
//    - Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
//    - Apply step 1 recursively on each of the two substrings x and y.
//
// Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1, otherwise, return false.
//
// Example 1:
// Input: s1 = "great", s2 = "rgeat"
// Output: true
// Explanation: One possible scenario applied on s1 is:
// "great" → "gr/eat" // divide at random index.
// "gr/eat" → "gr/eat" // random decision is not to swap the two substrings and keep them in order.
// "gr/eat" → "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at random index each of them.
// "g/r / e/at" → "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
// "r/g / e/at" → "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
// "r/g / e/ a/t" → "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
// The algorithm stops now, and the result string is "rgeat" which is s2.
//
// Example 2:
// Input: s1 = "abcde", s2 = "caebd"
// Output: false
//
// Example 3:
// Input: s1 = "a", s2 = "a"
// Output: true
//
// Constraints:
// - s1.length == s2.length
// - 1 <= s1.length <= 30
// - s1 and s2 consist of lowercase English letters.

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function isScramble_dfs(s1, s2) {
  // Initialize memoization map to store previously computed results
  const memo = new Map();
  
  // Helper function to check if s2 is a scrambled version of s1
  const dfs = (s1, s2) => {
    // Create a unique key for memoization using both strings
    const key = s1 + "#" + s2;
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Base case: if strings are equal, s2 is trivially a scramble of s1
    if (s1 === s2) {
      memo.set(key, true);
      return true;
    }
    
    // Base case: if lengths are different, impossible to be scrambled
    if (s1.length !== s2.length) {
      memo.set(key, false);
      return false;
    }
    
    // Optimization: check if both strings have the same character frequency
    // If not, s2 cannot be a scramble of s1
    const freq1 = {};
    const freq2 = {};
    for (let i = 0; i < s1.length; i++) {
      freq1[s1[i]] = (freq1[s1[i]] || 0) + 1;
      freq2[s2[i]] = (freq2[s2[i]] || 0) + 1;
    }
    
    for (let char in freq1) {
      if (freq1[char] !== freq2[char]) {
        memo.set(key, false);
        return false;
      }
    }
    
    // Try all possible split points from 1 to length-1
    for (let i = 1; i < s1.length; i++) {
      // Case 1: No swap - check if left parts match and right parts match
      // s1 = left1 + right1, s2 = left2 + right2
      const left1 = s1.substring(0, i);
      const right1 = s1.substring(i);
      const left2 = s2.substring(0, i);
      const right2 = s2.substring(i);
      
      if (dfs(left1, left2) && dfs(right1, right2)) {
        memo.set(key, true);
        return true;
      }
      
      // Case 2: With swap - check if left part of s1 matches right part of s2
      // and right part of s1 matches left part of s2
      const left2_swapped = s2.substring(s2.length - i);
      const right2_swapped = s2.substring(0, s2.length - i);
       // s2 = "rgeat", i = 2, s2.length = 5
       // left2_swapped = "at", right2_swapped = "rge"
      
      if (dfs(left1, left2_swapped) && dfs(right1, right2_swapped)) {
        memo.set(key, true);
        return true;
      }
    }
    
    // If no valid split found, s2 is not a scramble of s1
    memo.set(key, false);
    return false;
  };
  
  return dfs(s1, s2);
}

// Example Usage:
console.log(isScramble_dfs("great", "rgeat")); // true
console.log(isScramble_dfs("abcde", "caebd")); // false
console.log(isScramble_dfs("a", "a")); // true
console.log(isScramble_dfs("abc", "acb")); // true