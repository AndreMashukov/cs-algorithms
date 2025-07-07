// Problem: Palindrome Partitioning II
// LeetCode URL: https://leetcode.com/problems/palindrome-partitioning-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return the minimum cuts needed for a palindrome partitioning of s.

/**
 * @param {string} s
 * @return {number}
 */
function minCut_dp(s) {
  const n = s.length;
  
  // Step 1: Precompute palindrome information
  // isPalin[i][j] = true if s[i:j+1] is palindrome
  const isPalin = Array(n).fill(null).map(() => Array(n).fill(false));
  
  // Every single character is palindrome
  for (let i = 0; i < n; i++) {
    isPalin[i][i] = true;
  }
  
  // Check for palindromes of length 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      isPalin[i][i + 1] = true;
    }
  }
  
  // Check for palindromes of length 3 and more
  for (let length = 3; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;
      // s[i:j+1] is palindrome if s[i] == s[j] and s[i+1:j] is palindrome
      if (s[i] === s[j] && isPalin[i + 1][j - 1]) {
        isPalin[i][j] = true;
      }
    }
  }
  
  // Step 2: DP to find minimum cuts
  // dp[i] represents minimum cuts needed for s[0:i+1]
  const dp = Array(n).fill(Infinity);
  
  for (let i = 0; i < n; i++) {
    // If s[0:i+1] is already palindrome, no cuts needed
    if (isPalin[0][i]) {
      dp[i] = 0;
    } else {
      // Try all possible cuts and find minimum
      for (let j = 0; j < i; j++) {
        // If s[j+1:i+1] is palindrome, we can cut after position j
        if (isPalin[j + 1][i]) {
          dp[i] = Math.min(dp[i], dp[j] + 1);
        }
      }
    }
  }
  
  // Return minimum cuts needed for entire string
  return dp[n - 1];
}

// Example Usage:
console.log(minCut_dp("aab")); // Expected: 1
console.log(minCut_dp("a")); // Expected: 0
console.log(minCut_dp("ab")); // Expected: 1
console.log(minCut_dp("abccba")); // Expected: 0