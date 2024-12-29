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
  const freqMap = new Map()
  words.forEach((word) => {
    freqMap.set(word, (freqMap.get(word) || 0) + 1)
  })

  const wordLength = words[0].length

  const res = []
  for (let i = 0; i < s.length - wordLength * words.length + 1; i++) {
    const seen = new Map()
    let j = 0
    while (j < words.length) {
      const word = s.substr(i + j * wordLength, wordLength)
      if (freqMap.has(word)) {
        seen.set(word, (seen.get(word) || 0) + 1)
        if (seen.get(word) > freqMap.get(word)) {
          break
        }
      } else {
        break
      }
      j++
    }
    if (j === words.length) {
      res.push(i)
    }
  }
}
