// Given a string s, find the length of the longest
// substring without repeating characters.

// For s ="pwwkew" the answer should be 3
function lengthOfLongestSubstring (s) {
  const charSet = new Set()
  let l = 0
  let res = 0

  for (let r = 0; r < s.length; r++) {
    // If the character is already in the set, remove the character
    // at index l from the set and increment l
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

// When a character at index r is found in the charSet
// (meaning it's a repeating character in the current window),
// the algorithm needs to shrink the window to remove the repeating character.
// It does this by removing the character at the start of the window (s[l])
// from the charSet and moving the start of the window one character
// to the right (l += 1).
