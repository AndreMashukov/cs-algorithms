// Given a string s, return the number of palindromic substrings in it.

// A string is a palindrome when it reads the same backward as forward.

// A substring is a contiguous sequence of characters within the string.

// Example 1:

// Input: s = "abc"
// Output: 3
// Explanation: Three palindromic strings: "a", "b", "c".

const expandAroundCenter = (s, i, j) => {
  while (i >= 0 && j < s.length && s[i] === s[j]) {
    i -= 1
    j += 1
  }

  return j - i - 1
}

const countSubstrings = (s) => {
  let count = 0

  for (let i = 0; i < s.length; i += 1) {
    count += Math.ceil(expandAroundCenter(s, i, i) / 2)
    count += Math.floor(expandAroundCenter(s, i, i + 1) / 2)
  }

  return count
}

console.log(
  countSubstrings('aaa') // 6
)

// Dividing this length by 2 gives the number of characters to the left
// or right of the center,
// Math.ceil rounds this up to the nearest integer.
// This is because when the length is odd, the center of the palindrome
// is a character in the string, so we need to round up to count this character.
