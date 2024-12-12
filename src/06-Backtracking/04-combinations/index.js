// 77. Combinations
// https://leetcode.com/problems/path-sum/description/
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
  const result = []

  const backtrack = (i, cur) => {
    if (cur.length === k) {
      result.push(cur.slice())
      return
    }

    if (i > n) {
      return
    }

    cur.push(i)
    backtrack(i + 1, cur)
    cur.pop()
    backtrack(i + 1, cur)
  }

  backtrack(1, [])
  return result
}

// Time complecity O(k * 2^n)
// there are a lot of wasted steps where we are skipping elements
