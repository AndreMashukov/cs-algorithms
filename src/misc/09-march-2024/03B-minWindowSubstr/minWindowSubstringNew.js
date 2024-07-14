// You have two strings, s and t. The string t contains only unique elements.
//  Find and return the minimum consecutive substring of s
// that contains all of the elements from t.

// It's guaranteed that the answer exists. If there are several answers,
// return the one which starts from the smallest index.

class Solution {
  minWindow (s, t) {
    const map = new Map()

    // Populate the map with characters from t and their counts
    for (const x of t) {
      map.set(x, (map.get(x) || 0) + 1)
    }

    let matched = 0
    let start = 0
    let minLen = s.length + 1
    let subStr = 0
    for (let endWindow = 0; endWindow < s.length; endWindow++) {
      const right = s[endWindow]
      // If the current character is in t, decrease its count in the map
      if (map.has(right)) {
        map.set(right, map.get(right) - 1)
        // If the count becomes 0, it means we matched one character completely
        if (map.get(right) === 0) matched++
      }

      // Shrink the window from the left if all characters are matched
      while (matched === map.size) {
        // Update the minimum length and start position if a smaller substring is found
        if (minLen > endWindow - start + 1) {
          minLen = endWindow - start + 1
          subStr = start
        }
        const deleted = s[start++]
        // If the character removed is in t, adjust its count and matched count
        if (map.has(deleted)) {
          // If the count is 0, it means we need to match one more character
          if (map.get(deleted) === 0) matched--
          // Increase the count as we are moving ahead
          map.set(deleted, map.get(deleted) + 1)
        }
      }
    }
    // Return the minimum substring or an empty string if no such substring exists
    return minLen > s.length ? '' : s.substring(subStr, subStr + minLen)
  }
}

console.log(new Solution().minWindow('ADOBECODEBANC', 'ABC'))
