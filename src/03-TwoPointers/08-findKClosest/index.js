// https://www.lintcode.com/problem/460/
// https://www.youtube.com/watch?v=o-YDQzHoaKM&t=198s
// Given target, a non-negative integer k
// and an integer array A sorted in ascending order,
// find the k closest numbers to target in A, sorted
// in ascending order by the difference between the number and target.
// Otherwise, sorted in ascending order by number if the difference is same.

export class Solution {
  /**
   * @param a: an integer array
   * @param target: An integer
   * @param k: An integer
   * @return: an integer array
   */
  kClosestNumbers (a, target, k) {
    let l = 0 // Left pointer
    let r = a.length - 1 // Right pointer

    // Find the closest element to the target
    while (l < r) {
      const m = Math.floor((l + r) / 2)
      if (a[m] < target) {
        l = m + 1
      } else {
        r = m
      }
    }

    // Initialize two pointers for the closest elements
    l = r - 1
    r = r

    const result = []
    // Find the k closest elements
    while (k > 0) {
      if (l < 0) {
        result.push(a[r])
        r++
      } else if (r >= a.length) {
        result.push(a[l])
        l--
      } else if (Math.abs(a[l] - target) <= Math.abs(a[r] - target)) {
        result.push(a[l])
        l--
      } else {
        result.push(a[r])
        r++
      }
      k--
    }

    return result
  }
}

console.log(new Solution().kClosestNumbers([1, 2, 3], 3, 2)) // Expected [2, 1, 3]
