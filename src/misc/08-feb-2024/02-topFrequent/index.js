// Given an integer array nums and an integer k,
// return the k most frequent elements.
// You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

const solution = (nums, k) => {
  const map = new Map()
  const result = []

  for (const num of nums) {
    // map.get(num) + 1: This increments the count of num.
    // If num is not yet in the map,
    // this expression results in NaN because undefined + 1 is NaN.
    map.set(num, map.get(num) + 1 || 1)
  }

  const sorted = Array.from(map).sort((a, b) => b[1] - a[1])

  for (let i = 0; i < k; i++) {
    result.push(sorted[i][0])
  }

  return result
};
