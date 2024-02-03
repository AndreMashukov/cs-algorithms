// Given an unsorted array of integers nums,
// return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.

// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

const longestConsecutive = (nums) => {
  const set = new Set(nums)
  let max = 0

  for (const num of set) {
    if (!set.has(num - 1)) {
      let current = num
      let currentStreak = 1

      while (set.has(current + 1)) {
        current++
        currentStreak++
      }

      max = Math.max(max, currentStreak)
    }
  }

  return max
};
