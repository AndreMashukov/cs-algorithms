// Given a string s, return the longest
// palindromic substring in s.

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

const expandAroundCenter = (s, i, j) => {
  while (i >= 0 && j < s.length && s[i] === s[j]) {
    i -= 1
    j += 1
  }

  return j - i - 1
}

const longestPalindrome = (s) => {
  if (s.length < 1) return ''
  let start = 0
  let end = 0

  for (let i = 0; i < s.length; i += 1) {
    const len1 = expandAroundCenter(s, i, i)
    const len2 = expandAroundCenter(s, i, i + 1)
    const len = Math.max(len1, len2)

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }

    console.log({ start, end })
  }
  return s.substring(start, end + 1)
}

console.log(
  longestPalindrome('babad') // 'bab'
)
