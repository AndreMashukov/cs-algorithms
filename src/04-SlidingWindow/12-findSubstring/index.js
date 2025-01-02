// 30. Substring with Concatenation of All Words
// https://www.youtube.com/watch?v=taYRJf-M25I
// https://leetcode.com/problems/substring-with-concatenation-of-all-words/

// You are given a string s and an array of strings words.
// All the strings of words are of the same length.

// A concatenated string is a string that exactly contains all the strings
// of any permutation of words concatenated.

// For example, if words = ["ab","cd","ef"],
// then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd",
// and "efcdab" are all concatenated strings. "
// acdbef" is not a concatenated string because
// it is not the concatenation of any permutation of words.
// Return an array of the starting indices of all the concatenated substrings in s.
// You can return the answer in any order.

// Example 1:
// Input: s = "barfoothefoobarman", words = ["foo","bar"]
// Output: [0,9]
// Explanation:

// The substring starting at 0 is "barfoo". It is the concatenation
// of ["bar","foo"] which is a permutation of words.
// The substring starting at 9 is "foobar".
// It is the concatenation of ["foo","bar"] which is a permutation of words.

const findSubstring = (s, words) => {
  // Create a frequency map to count occurrences of each word in words
  const freqMap = new Map()
  words.forEach((word) => {
    freqMap.set(word, (freqMap.get(word) || 0) + 1)
  })

  // Length of each word (all words are of the same length)
  const wordLength = words[0].length

  // Result array to store starting indices of concatenated substrings
  const res = []

  // Iterate over the string s
  for (let i = 0; i < s.length - wordLength * words.length + 1; i++) {
    // Map to keep track of seen words in the current window
    const seen = new Map()
    let j = 0

    // Check if the substring starting at index i is a concatenation of all words
    while (j < words.length) {
      // Extract a substring of length wordLength
      const word = s.substr(i + j * wordLength, wordLength)

      // If the word is in the frequency map
      if (freqMap.has(word)) {
        // Increment the count of the word in the seen map
        seen.set(word, (seen.get(word) || 0) + 1)

        // If the word count exceeds the frequency in the original words array, break
        if (seen.get(word) > freqMap.get(word)) {
          break
        }
      } else {
        // If the word is not in the frequency map, break
        break
      }
      j++
    }

    // If all words are matched, add the starting index to the result
    if (j === words.length) {
      res.push(i)
    }
  }

  // Return the result array
  return res
}
