// 233. Number of Digit One
// https://leetcode.com/problems/number-of-digit-one/description/
// Problem Description:
// Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.
//
// Example 1:
// Input: n = 13
// Output: 6
// Explanation: Digit 1 occurred in the following numbers: 1, 10, 11, 12, 13.
//
// Example 2:
// Input: n = 0
// Output: 0
//
// Constraints:
// 0 <= n <= 10^9

/**
 * @param {number} n
 * @return {number}
 */
function countDigitOne_dfs(n) {
  // Handle edge case
  if (n <= 0) return 0;
  
  // Convert number to string to work with digits
  const str = n.toString();
  const len = str.length;
  
  // Memoization map: key is "pos,tight,count"
  // pos: current position in the number
  // tight: whether we're still bounded by the original number
  // count: count of 1s seen so far
  const memo = new Map();
  
  // Recursive function using digit DP approach
  // pos: current digit position (0-indexed from left)
  // tight: true if we must stay <= original number's digits
  // count: number of 1s accumulated in the current number being formed
  const dfs = (pos, tight, count) => {
    // Base case: processed all digits
    if (pos === len) {
      return count;
    }
    
    // Create memoization key
    const key = `${pos},${tight},${count}`;
    
    // Return cached result if exists
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Determine the maximum digit we can place at current position
    // If tight is true, we're bounded by the original number's digit
    // If tight is false, we can use any digit 0-9
    const maxDigit = tight ? parseInt(str[pos]) : 9;
    
    let result = 0;
    
    // Try all possible digits at current position
    for (let digit = 0; digit <= maxDigit; digit++) {
      // Update count: add 1 if current digit is 1
      const newCount = count + (digit === 1 ? 1 : 0);
      
      // Update tight constraint:
      // Remains tight only if we were tight AND chose the max allowed digit
      const newTight = tight && (digit === maxDigit);
      
      // Recursively process next position
      result += dfs(pos + 1, newTight, newCount);
    }
    
    // Cache and return result
    memo.set(key, result);
    return result;
  };
  
  // Start DFS from position 0, tight=true, count=0
  return dfs(0, true, 0);
}

// Example Usage:
console.log(countDigitOne_dfs(13)); // Expected: 6
console.log(countDigitOne_dfs(0)); // Expected: 0
console.log(countDigitOne_dfs(100)); // Expected: 21
console.log(countDigitOne_dfs(1)); // Expected: 1