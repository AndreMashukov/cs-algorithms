// You are given an m x n integer matrix matrix with the following two properties:

// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.

// You must write a solution in O(log(m * n)) time complexity.

const solution = (matrix, target) => {
  const m = matrix.length
  const n = matrix[0].length
  let l = 0
  let r = m * n - 1

  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    const midVal = matrix[Math.floor(mid / n)][mid % n]

    if (midVal === target) return true
    if (midVal < target) l = mid + 1
    else r = mid - 1
  }

  return false
}
