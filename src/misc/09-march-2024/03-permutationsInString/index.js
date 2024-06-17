// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

// In other words, return true if one of s1's permutations is the substring of s2.

// Example 1:

// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").

const compareMaps = (map1, map2) => {
  if (map1.size !== map2.size) {
    return false
  }

  for (const [key, value] of map1) {
    if (map2.get(key) !== value) {
      return false
    }
  }

  return true
}

const solution = (s1, s2) => {
  const s1Length = s1.length
  const s2Length = s2.length
  const s1Map = new Map()
  const s2Map = new Map()

  // Initializes the s1Map and s2Map with the frequency of each character
  // in the first s1Length characters of s1 and s2
  for (let i = 0; i < s1Length; i++) {
    s1Map.set(s1[i], (s1Map.get(s1[i]) || 0) + 1)
    s2Map.set(s2[i], (s2Map.get(s2[i]) || 0) + 1)
  }

  //   s1Map: { 'a': 1, 'b': 1 },
  //   s2Map: { 'e': 1, 'i': 1 }

  // Checks if s2 contains a permutation of s1 by comparing s1Map and s2Map
  for (let i = 0; i < s2Length - s1Length; i++) {
    if (compareMaps(s1Map, s2Map)) {
      return true
    }

    // before { 'e': 1, 'i': 1 }
    // Updates s2Map by removing the character at index i
    // and adding the character at index i + s1Length
    s2Map.set(s2[i], s2Map.get(s2[i]) - 1)
    if (s2Map.get(s2[i]) === 0) {
      s2Map.delete(s2[i])
    }

    // Adding the character at the end of the next substring of s2 to s2Map
    // in preparation for the next iteration of the loop.
    s2Map.set(s2[i + s1Length], (s2Map.get(s2[i + s1Length]) || 0) + 1)
    // after { 'i': 1, 'd': 1 }
  }

  return compareMaps(s1Map, s2Map)
}

module.exports = compareMaps