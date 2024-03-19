// Given a string s, find the length of the longest
// substring without repeating characters.

// For s ="pwwkew" the answer should be 3
function lengthOfLongestSubstring (s) {
  const charSet = new Set()
  let l = 0
  let res = 0

  for (let r = 0; r < s.length; r++) {
    // If the character is already in the set, remove the character from the set
    // and move the left pointer
    while (charSet.has(s[r])) {
      charSet.delete(s[l])
      l += 1
    }
    charSet.add(s[r])
    res = Math.max(res, r - l + 1)
  }
  return res
}

console.log(lengthOfLongestSubstring('pwwkew')) // Outputs: 3
