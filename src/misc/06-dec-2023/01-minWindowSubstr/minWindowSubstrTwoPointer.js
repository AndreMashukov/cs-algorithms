// You have two strings, s and t. The string t contains only unique elements.
//  Find and return the minimum consecutive substring of s
// that contains all of the elements from t.

// It's guaranteed that the answer exists. If there are several answers,
// return the one which starts from the smallest index.

// Implement a solution using left and right pointers
function solution1 (s, t) {
  if (s.length === 0) {
    return ''
  }
  if (t.length === 0) {
    return ''
  }
  if (s === t) {
    return s
  }
  const tt = t.split('')
  // starts with both pointers at the start of s
  // and moves them to gradually increase the size of the substring
  // and then decrease it when a valid substring is found.
  let left = 0
  let right = 0
  let min = Infinity
  let result = ''

  while (right < s.length) {
    const sub = s.substring(left, right + 1)
    // the characters in the current substring sub that are also in the target string t.
    const filtered = sub.split('').filter((char) => tt.includes(char))
    // if the filtered array contains all the unique characters in the target string t.
    if ([...new Set(filtered)].length === tt.length) {
      // sub.length (or right - left)
      if (sub.length < min) {
        min = sub.length
        result = sub
      }
      // start considering smaller substrings that might also contain all the unique characters in t.
      left++
    } else {
      // as long as the current substring does not contain all the unique characters in t
      right++
    }
  }

  return result
}

console.log(solution1('ADOBECODEBANC', 'ABC'))
