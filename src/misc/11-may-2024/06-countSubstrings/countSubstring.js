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
    // why ceil?
    count += Math.ceil(expandAroundCenter(s, i, i) / 2)
    // why floor
    count += Math.floor(expandAroundCenter(s, i, i + 1) / 2)
  }

  return count
}

console.log(
  countSubstrings('aaa') // 6
)
