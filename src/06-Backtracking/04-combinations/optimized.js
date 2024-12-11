// 77. Combinations

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

    for (let j = i; j <= n; j++) {
      cur.push(j)
      backtrack(j + 1, cur)
      cur.pop()
    }
  }

  backtrack(1, [])
  return result
}

// Time complexity O(k * C(n, k))
// C(n, k) = n! / (k! * (n - k)!)
// Instead of choose which elements to include or exclude, we can simply choose which elements to include.

// For the first element, we can choose from
// 1 to n
// For the next element, we can choose any except for the one we just chose.
