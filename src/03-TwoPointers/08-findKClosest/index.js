// https://leetcode.com/problems/find-k-closest-elements/
// https://www.youtube.com/watch?v=o-YDQzHoaKM&t=198s
// Given target, a non-negative integer k
// and an integer array A sorted in ascending order,
// find the k closest numbers to target in A, sorted
// in ascending order by the difference between the number and target.
// Otherwise, sorted in ascending order by number if the difference is same.

class Solution {
  /**
   * @param a: an integer array
   * @param target: An integer
   * @param k: An integer
   * @return: an integer array
   */
  kClosestNumbers (arr, k, x) {
    let l = 0 // Left pointer
    let r = arr.length - k // Right pointer

    // Find the closest element to the target
    while (l < r) {
      const m = Math.floor((l + r) / 2)
      // If the left element is closer to the target
      if (x - arr[m] > arr[m + k] - x) { 
        l = m + 1
      } else {
        r = m
      }
    }

    return arr.slice(l, l + k)
  }
}
console.log(new Solution().kClosestNumbers([1, 2, 3], 3, 2)) // Expected [2, 1, 3]
