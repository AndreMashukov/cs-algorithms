// Given an array of strings strs,
//  group the anagrams together.
// You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

const solution = (strs) => {
  const map = new Map()

  for (const str of strs) {
    const key = [...str].sort().join('')

    if (!map.has(key)) {
      map.set(key, [])
    }

    // push the current string into the array of the current key
    map.get(key).push(str)
  }

  return Array.from(map.values())
}

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]


