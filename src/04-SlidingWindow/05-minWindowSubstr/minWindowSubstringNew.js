// You have two strings, s and t. The string t contains only unique elements.
// Find and return the minimum consecutive substring of s
// that contains all of the elements from t.

// It's guaranteed that the answer exists. If there are several answers,
// return the one which starts from the smallest index.

// https://www.youtube.com/watch?v=eS6PZLjoaq8

function solution (s, t) {
  // If t is an empty string, return an empty string
  if (t === '') return ''

  // Maps to store the frequency of characters in t and the current window in s
  const countT = new Map()
  const window = new Map()

  // Populate countT with the frequency of each character in t
  for (const char of t) {
    countT.set(char, (countT.get(char) || 0) + 1)
  }

  // Variables to keep track of the number of characters matched and needed
  let have = 0
  const need = countT.size

  // Variables to store the result substring and its length
  let res = ''
  let resLen = Infinity

  // Two-pointer technique to expand and contract the window
  for (let left = 0, right = 0; right < s.length; right++) {
    const char = s[right]

    // If the character is in t, update the window map
    if (countT.has(char)) {
      window.set(char, (window.get(char) || 0) + 1)
      // If the frequency of the character in the window matches the frequency in t, increment have
      if (window.get(char) === countT.get(char)) {
        have++
      }
    }

    // While the window contains all characters of t
    while (have === need) {
      // Update the result if the current window is smaller
      if (right - left + 1 < resLen) {
        resLen = right - left + 1
        res = s.slice(left, right + 1)
      }

      // Try to contract the window from the left
      const char = s[left]
      if (countT.has(char)) {
        window.set(char, window.get(char) - 1)
        // If the frequency of the character in the window is less than in t, decrement have
        if (window.get(char) < countT.get(char)) {
          have--
        }
      }
      left++
    }
  }

  // Return the minimum window substring
  return res
}

console.log(solution('ADOBECODEBANC', 'ABC')) // BANC
console.log(solution('OUZODYXAZV', 'XYZ')) // YXAZ