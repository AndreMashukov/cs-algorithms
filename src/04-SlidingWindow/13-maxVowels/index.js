// 1456. Maximum Number of Vowels in a Substring of Given Length
// https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
// https://www.youtube.com/watch?v=kEfPSzgL-Ss

// Given a string s and an integer k, return the maximum number of vowel
// letters in any substring of s with length k.
// Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
// Example 1:
// Input: s = "abciiidef", k = 3
// Output: 3
// Explanation: The substring "iii" contains 3 vowel letters.

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxVowels = function (s, k) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
  let l = 0 // Initialize the left pointer of the sliding window
  let r = 0 // Initialize the right pointer of the sliding window
  let max = 0 // Variable to store the maximum number of vowels
  let vwCnt = 0 // Counter for the number of vowels in the current window

  // Iterate through the string using the right pointer
  while (r < s.length) {
    if (vowels.has(s[r])) {
      vwCnt++ // Increment vwCnt if the current element is a vowel
    }

    // If the window size exceeds k, shrink the window from the left
    if (r - l + 1 > k) {
      if (vowels.has(s[l])) {
        vwCnt-- // Decrement vwCnt if the element being removed is a vowel
      }
      l++ // Move the left pointer to the right
    }

    // Update the maximum count if the current window is larger
    max = Math.max(max, vwCnt)
    r++ // Expand the window by moving the right pointer to the right
  }

  return max // Return the maximum number of vowels found
}

console.log(maxVowels('abciiidef', 3)) // Expected output: 3
