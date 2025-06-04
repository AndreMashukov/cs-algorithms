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
    // Object to store the frequency of each element
    const count = {}
    // Array of arrays to store elements by their frequency
    const freq = Array.from({ length: nums.length + 1 }, () => [])

    // Count the frequency of each element in nums
    for (const n of nums) {
      count[n] = (count[n] || 0) + 1
    }

    // Group elements by their frequency
    for (const n in count) {
      freq[count[n]].push(parseInt(n))
    }

    // Result array to store the k most frequent elements
    const res = []
    // Iterate from the highest possible frequency to the lowest
    for (let i = freq.length - 1; i > 0; i--) {
      // Add elements with the current frequency to the result
      for (const n of freq[i]) {
        res.push(n)
        // If we have found k elements, return the result
        if (res.length === k) {
          return res
        }
      }
    }
  }
}

// Example usage
console.log(new Solution().topKFrequent([1, 1, 1, 2, 2, 3], 2)) // [1, 2]

// {
//   count: { '1': 3, '2': 2, '3': 1 },
//   freq: [
//     [],    [ 3 ], [ 2 ],
//     [ 1 ], [],    [],
//     []
//   ]
// }

// Frequency Count: Use a hash map (count) to count the frequency
// of each element in the array.
// Bucket Sort: Create an array of buckets (freq),
// where the index represents the frequency,
// and each bucket contains elements with that frequency.
// Collect Results: Iterate through the buckets from highest to lowest frequency,
// collecting elements until k elements are gathered.

// Frequency count: { '1': 3, '2': 2, '3': 1 }
// Buckets: [[], [3], [2], [1]]
// Result: [1, 2] (top 2 frequent elements)
