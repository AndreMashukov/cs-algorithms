// 1358. Number of Substrings Containing All Three Characters
// https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
// https://www.youtube.com/watch?v=sadDk3AsFEw&t=141s
// Given a string s consisting only of characters a, b and c.
// Return the number of substrings containing at least one occurrence
// of all these characters a, b and c.

// Example 1:

// Input: s = "abcabc"
// Output: 10
// Explanation: The substrings containing at least one occurrence
// of the characters a, b and c are
// "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).

/**
 * @param {string} s
 * @return {number}
 */
const numberOfSubstrings = function (s) {
  let count = 0 // Initialize the count of substrings
  let start = 0 // Initialize the start pointer
  let end = 0 // Initialize the end pointer
  const freqMap = new Map() // Map to store the frequency of characters in the current window

  // Iterate through the string with the end pointer
  while (end < s.length) {
    // Add the current character to the frequency map
    freqMap.set(s[end], (freqMap.get(s[end]) || 0) + 1)

    // Check if the current window contains all three characters 'a', 'b', and 'c'
    while (freqMap.size === 3) {
      // If it does, add the number of valid substrings ending at 'end' to the count
      // Meaning that we adding the rest of the characters to the valid string.
      count += s.length - end
      // Decrease the frequency of the character at the start pointer
      freqMap.set(s[start], freqMap.get(s[start]) - 1)
      // If the frequency becomes zero, remove the character from the map
      if (freqMap.get(s[start]) === 0) {
        freqMap.delete(s[start])
      }
      // Move the start pointer to the right
      start++
    }

    // Move the end pointer to the right
    end++
  }

  return count // Return the count of substrings containing all three characters
}

// Example usage:
console.log(numberOfSubstrings('abcabc')) // Expected output: 10
// console.log(numberOfSubstrings('aaacb')) // Expected output: 3
// console.log(numberOfSubstrings('abc')) // Expected output: 1

// Valid Substrings:
// When the window contains all three characters,
// any substring that starts within this window
// and ends at or after the end pointer is a valid substring.

// Example:
// Input: s = "abcabc"
// Current Window: start = 0, end = 2 (window contains "abc")
// Valid Substrings:
// Substrings ending at end = 2: "abc"
// Substrings ending at end = 3: "abca", "bca"
// Substrings ending at end = 4: "abcab", "bcab", "cab"
// Substrings ending at end = 5: "abcabc", "bcabc", "cabc", "abc"
// Count Calculation:

// For end = 2, the number of valid substrings is s.length - end = 6 - 2 = 4.
