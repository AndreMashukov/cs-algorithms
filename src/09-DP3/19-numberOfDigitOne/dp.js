// Problem: Number of Digit One
// LeetCode URL: https://leetcode.com/problems/number-of-digit-one/description/
// Problem Description:
// Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.

/**
 * @param {number} n
 * @return {number}
 */
function countDigitOne_dp(n) {
  // Handle edge case
  if (n <= 0) return 0;
  
  // This solution uses a mathematical DP approach
  // We count 1s at each digit position (ones, tens, hundreds, etc.)
  let count = 0;
  
  // Iterate through each digit position
  // factor represents the current position value (1, 10, 100, ...)
  for (let factor = 1; factor <= n; factor *= 10) {
    // Divide the number into three parts around current digit position:
    // higher: digits to the left of current position
    // cur: current digit at this position
    // lower: digits to the right of current position
    
    const divider = factor * 10;
    const higher = Math.floor(n / divider);
    const cur = Math.floor(n / factor) % 10;
    const lower = n % factor;
    
    // Count 1s contributed by the 'higher' part
    // For each complete cycle of higher digits, 
    // digit 1 appears 'factor' times at current position
    count += higher * factor;
    
    // Count 1s contributed by the current digit
    if (cur === 0) {
      // Current digit is 0, no additional 1s at this position
      // Example: n=1023, position=tens, cur=2
      // Numbers like 10-19, 110-119, etc. are already counted
    } else if (cur === 1) {
      // Current digit is 1, add (lower + 1) occurrences
      // Example: n=1123, position=thousands
      // We have 1000, 1001, ..., 1123 (total: 124 numbers)
      count += lower + 1;
    } else {
      // Current digit is > 1, add full 'factor' occurrences
      // Example: n=1323, position=hundreds, cur=3
      // We have 100-199 (100 numbers with 1 in hundreds place)
      count += factor;
    }
  }
  
  return count;
}

// Example Usage:
console.log(countDigitOne_dp(13)); // Expected: 6
console.log(countDigitOne_dp(0)); // Expected: 0
console.log(countDigitOne_dp(100)); // Expected: 21
console.log(countDigitOne_dp(1)); // Expected: 1