// 77. Combinations
// https://leetcode.com/problems/combinations/description/
// Given two integers n and k, return all possible combinations of k numbers
// chosen from the range [1, n].
// You may return the answer in any order.

// Example 1:
// Input: n = 4, k = 2
// Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  const res = [] // Initialize the result array to store combinations

  const backtrack = (i, cur) => {
    if (cur.length === k) { // If the current combination is of length k
      res.push(cur.slice()) // Add a copy of the current combination to the result
      return // Backtrack
    }

    if (i > n) { // If the current index exceeds n
      return // Backtrack
    }

    for (let j = i; j <= n; j++) { // Iterate from the current index to n
      cur.push(j) // Add the current number to the combination
      backtrack(j + 1, cur) // Recurse with the next number
      cur.pop() // Remove the last number to try the next possibility
    }
  }

  backtrack(1, []) // Start backtracking from 1 with an empty combination
  return res // Return the result array containing all combinations
}

// Time complexity O(k * C(n, k))
// C(n, k) = n! / (k! * (n - k)!)
// Instead of choose which elements to include or exclude,
// we can simply choose which elements to include.

// For the first element, we can choose from
// 1 to n
// For the next element, we can choose any except for the one we just chose.
