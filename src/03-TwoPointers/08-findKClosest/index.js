// https://leetcode.com/problems/find-k-closest-elements/
// https://www.youtube.com/watch?v=o-YDQzHoaKM&t=198s
// Given target, a non-negative integer k
// and an integer array A sorted in ascending order,
// find the k closest numbers to target in A, sorted
// in ascending order by the difference between the number and target.
// Otherwise, sorted in ascending order by number if the difference is same.

// O(Log(N−K))
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
      if (x - arr[m] > arr[m + k] - x) { // tie breaker
        l = m + 1
      } else {
        r = m
      }
    }

    return arr.slice(l, l + k)
  }
}
console.log(new Solution().kClosestNumbers([1, 2, 3], 3, 2)) // Expected [2, 1, 3]

// Why arr.length - k:
// If the right pointer were initialized to arr.length - 1, it would allow subarrays
// that extend beyond the end of the array.
// By setting the right pointer to arr.length - k, we ensure
// that the subarray of length k stays within the bounds of the array.
// This way, the binary search will only consider valid starting
// indices for the subarray.

// Example:
// Input:
// Array: [1, 2, 3, 4, 5]
// Target: 3
// k: 2
// Goal:
// Find the 2 closest numbers to 3 in the array [1, 2, 3, 4, 5].

// Steps:
// Initialization:

// Left pointer (l): 0
// Right pointer (r): arr.length - k = 5 - 2 = 3
// Binary Search:

// First Iteration:

// Calculate middle index (m): Math.floor((0 + 3) / 2) = 1
// Compare differences:
// x - arr[m] = 3 - 2 = 1
// arr[m + k] - x = arr[1 + 2] - 3 = arr[3] - 3 = 4 - 3 = 1
// Since 1 is not greater than 1, move the right pointer:
// r = m = 1
// Second Iteration:

// Calculate middle index (m): Math.floor((0 + 1) / 2) = 0
// Compare differences:
// x - arr[m] = 3 - 1 = 2
// arr[m + k] - x = arr[0 + 2] - 3 = arr[2] - 3 = 3 - 3 = 0
// Since 2 is greater than 0, move the left pointer:
// l = m + 1 = 1
// End of Binary Search:

// The binary search ends with l = 1.
// The 2 closest numbers starting from index 1 are [2, 3].
