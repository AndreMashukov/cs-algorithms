// You are given a string s and an integer k.
// You can choose any character of the string and change
// it to any other uppercase English character.
// You can perform this operation at most k times.

// Return the length of the longest substring containing
// the same letter you can get after performing the above operations.

// Example 1:

// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa.

const solution = (s, k) => {
  let max = 0
  let start = 0
  let end = 0
  // Initializes a map to store the frequency of each character in the string
  const freqMap = new Map()

  // while-loop to iterate through the string
  while (end < s.length) {
    // Updates the frequency of the character at index end
    freqMap.set(s[end], (freqMap.get(s[end]) || 0) + 1)
    // Updates the max variable with the maximum frequency of any character
    max = Math.max(max, freqMap.get(s[end]))

    // if the number of operations needed to change the characters
    // in the substring s[start:end + 1] to the same character is greater than k
    if (end - start + 1 - max > k) {
      // Updates the frequency of the character at index start
      freqMap.set(s[start], freqMap.get(s[start]) - 1)
      start++
    }

    end++
  }

  return end - start
}
