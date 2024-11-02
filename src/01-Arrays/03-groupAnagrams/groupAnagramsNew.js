// Given an array of strings strs,
//  group the anagrams together.
// You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging
// the letters of a different word or phrase,
// typically using all the original letters exactly once.

class Solution {
  /**
   * @param {string[]} strs
   * @return {string[][]}
   */
  groupAnagrams (strs) {
    const ans = {}

    for (const s of strs) {
      const count = Array(26).fill(0)
      for (const c of s) {
        count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++
        // console.log(count)
      }

      const key = count.join('#')
      if (!ans[key]) {
        ans[key] = []
      }

      // console.log(ans)

      ans[key].push(s)
    }
    return Object.values(ans)
  }
}

console.log(
  new Solution().groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
)

// "eat" =>
// [
//   1, 0, 0, 0, 1, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 1, 0, 0, 0, 0,
//   0, 0
// ]

// {
//   '1#0#0#0#1#0#0#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#0': [ 'eat', 'tea', 'ate' ],
//   '1#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#1#0#0#0#0#0#0': [ 'tan', 'nat' ],
//   '1#1#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#0': []
// }
