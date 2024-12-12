// 47. Permutations II
// https://leetcode.com/problems/permutations-ii/description/
// Given a collection of numbers, nums,
// that might contain duplicates,
// return all possible unique permutations
// in any order.

// Example 1:
// Input: nums = [1,1,2]
// Output:
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = function (nums) {
  // Use hashmap to store the frequency of each number in nums
  const freq = {}
  for (const num of nums) {
    freq[num] = freq[num] + 1 || 1
  }

  const res = [] // Initialize the result array to store unique permutations

  // Backtracking function to generate permutations
  const backtrack = (cur) => {
    // If the current permutation is of the same length as nums, add it to the result
    if (cur.length === nums.length) {
      res.push([...cur])
      return;
    }

    // Iterate through the frequency map
    for (const num in freq) {
      if (freq[num] > 0) { // If the current number is available
        cur.push(+num) // Add the current number to the current permutation
        freq[num]-- // Decrease the frequency of the current number
        backtrack(cur) // Recursively generate permutations with the current number included
        cur.pop() // Remove the current number from the current permutation (backtrack)
        freq[num]++ // Restore the frequency of the current number
      }
    }
  }

  backtrack([]) // Start the backtracking with an empty permutation

  return res // Return the result array containing all unique permutations
};

// Example usage:
console.log(permuteUnique([1, 1, 2])) // Expected output: [[1,1,2], [1,2,1], [2,1,1]]
