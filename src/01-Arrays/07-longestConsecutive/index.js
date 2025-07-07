// Given an unsorted array of integers nums,
// return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.

// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4].
// Therefore its length is 4.

const longestConsecutive = (nums) => {
  // create a set from the array
  const set = new Set(nums)
  let max = 0

  // iterate through the set !!!
  for (const num of set) {
    // check if the current number is the start of a sequence
    if (!set.has(num - 1)) {
      let current = num
      let currentStreak = 1

      // check for consecutive numbers
      while (set.has(current + 1)) {
        // move to the next number
        current++
        currentStreak++
      }

      // update the max streak !!!
      max = Math.max(max, currentStreak)
    }
  }

  return max
}
