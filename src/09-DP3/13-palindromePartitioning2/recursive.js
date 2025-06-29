// 132. Palindrome Partitioning II
// https://leetcode.com/problems/palindrome-partitioning-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given a string s, partition s such that every substring of the partition is a palindrome.
// Return the minimum cuts needed for a palindrome partitioning of s.
//
// Example 1:
// Input: s = "aab"
// Output: 1
// Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
//
// Example 2:
// Input: s = "a"
// Output: 0
//
// Example 3:
// Input: s = "ab"
// Output: 1
//
// Constraints:
// 1 <= s.length <= 2000
// s consists of lowercase English letters only.

/**
 * @param {string} s
 * @return {number}
 */
function minCut_dfs(s) {
  const n = s.length;
  
  // Initialize memoization map to store computed results
  const memo = new Map();
  
  // Helper function to check if substring s[i:j+1] is palindrome
  const isPalindrome = (i, j) => {
    while (i < j) {
      if (s[i] !== s[j]) {
        return false;
      }
      i++;
      j--;
    }
    return true;
  };
  
  // DFS function to find minimum cuts needed for s[start:end]
  const dfs = (start) => {
    // Base case: if we've processed entire string, no more cuts needed
    if (start >= n) {
      return 0;
    }
    
    // If we've already computed this subproblem, return cached result
    if (memo.has(start)) {
      return memo.get(start);
    }
    
    let minCuts = Infinity;
    
    // Try all possible endings for current substring starting at 'start'
    for (let end = start; end < n; end++) {
      // If substring from start to end is palindrome, we can make a cut here
      if (isPalindrome(start, end)) {
        // Calculate cuts needed for remaining part of string
        const remainingCuts = dfs(end + 1);
        
        // If this is the last substring (end reaches string end), no additional cut needed
        // Otherwise, we need 1 cut to separate current palindrome from rest
        const totalCuts = (end === n - 1) ? remainingCuts : 1 + remainingCuts;
        
        // Update minimum cuts found so far
        minCuts = Math.min(minCuts, totalCuts);
      }
    }
    
    // Store result in memoization map to avoid recomputation
    memo.set(start, minCuts);
    
    return minCuts;
  };
  
  // Start DFS from beginning of string
  return dfs(0);
}

// Example Usage:
console.log(minCut_dfs("aab")); // Expected: 1
console.log(minCut_dfs("a")); // Expected: 0
console.log(minCut_dfs("ab")); // Expected: 1
console.log(minCut_dfs("abccba")); // Expected: 0