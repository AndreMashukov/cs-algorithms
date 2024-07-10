// Given an integer array nums and an integer k,
// return the k most frequent elements.
// You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */
  topKFrequent (nums, k) {
    const count = {}
    const freq = Array.from({ length: nums.length + 1 }, () => [])
    // [1, 2]

    for (const n of nums) {
      count[n] = (count[n] || 0) + 1
    }
    for (const n in count) {
      freq[count[n]].push(parseInt(n))
    }
    // console.log({ count, freq })

    const res = []
    for (let i = freq.length - 1; i > 0; i--) {
      for (const n of freq[i]) {
        res.push(n)
        if (res.length === k) {
          return res
        }
      }
    }
  }
}

console.log(new Solution().topKFrequent([1, 1, 1, 2, 2, 3], 2)) // [1, 2]

// {
//   count: { '1': 3, '2': 2, '3': 1 },
//   freq: [
//     [],    [ 3 ], [ 2 ],
//     [ 1 ], [],    [],
//     []
//   ]
// }
