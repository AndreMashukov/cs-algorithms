// Problem: Scramble String
// LeetCode URL: https://leetcode.com/problems/scramble-string/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// We can scramble a string s to get a string t using the following algorithm:
//
// 1. If the length of the string is 1, stop.
// 2. If the length of the string is > 1, do the following:
//    - Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
//    - Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
//    - Apply step 1 recursively on each of the two substrings x and y.

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function isScramble_dp(s1, s2) {
  // Check basic conditions: strings must have same length
  if (s1.length !== s2.length) return false;
  if (s1 === s2) return true;
  
  const n = s1.length;
  
  // Initialize 3D DP array: dp[len][i][j] represents whether
  // s1.substring(i, i+len) can be scrambled to form s2.substring(j, j+len)
  const dp = Array(n + 1).fill(null).map(() => 
    Array(n).fill(null).map(() => Array(n).fill(false))
  );
  
  // Base case: single characters
  // For length 1, check if characters at positions i and j are equal
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dp[1][i][j] = s1[i] === s2[j];
    }
  }
  
  // Fill DP table for lengths 2 to n
  for (let len = 2; len <= n; len++) {
    // Try all possible starting positions for s1 substring
    for (let i = 0; i <= n - len; i++) {
      // Try all possible starting positions for s2 substring
      for (let j = 0; j <= n - len; j++) {
        // Try all possible split points within current length
        for (let k = 1; k < len; k++) {
          // Case 1: No swap
          // Left part: s1[i...i+k-1] matches s2[j...j+k-1]
          // Right part: s1[i+k...i+len-1] matches s2[j+k...j+len-1]
          if (dp[k][i][j] && dp[len - k][i + k][j + k]) {
            dp[len][i][j] = true;
            break;
          }
          
          // Case 2: With swap
          // Left part: s1[i...i+k-1] matches s2[j+len-k...j+len-1]
          // Right part: s1[i+k...i+len-1] matches s2[j...j+len-k-1]
          if (dp[k][i][j + len - k] && dp[len - k][i + k][j]) {
            dp[len][i][j] = true;
            break;
          }
        }
      }
    }
  }
  
  // Return whether entire s1 can be scrambled to form entire s2
  return dp[n][0][0];
}

// Example Usage:
console.log(isScramble_dp("great", "rgeat")); // true
console.log(isScramble_dp("abcde", "caebd")); // false
console.log(isScramble_dp("a", "a")); // true
console.log(isScramble_dp("abc", "acb")); // true