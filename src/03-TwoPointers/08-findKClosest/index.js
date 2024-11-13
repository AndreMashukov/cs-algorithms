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
   * @param k: An integer
   * @param x: An integer
   * @return: an integer array
   */
  kClosestNumbers (a, k, x) {
    let l = 0 // Left pointer
    let r = a.length - k // Right pointer

    // Binary search to find the starting index of the k closest numbers
    while (l < r) {
      const m = Math.floor(l + (r - l) / 2) // Middle index
      // Compare the differences between the target and the middle elements
      if (x - a[m] > a[m + k] - x) {
        l = m + 1 // Move the left pointer to the right
      } else {
        r = m // Move the right pointer to the left
      }
    }

    // Return the k closest numbers starting from index l
    return a.slice(l, l + k)
  }
}

// Binary Search:

// Perform binary search to find the starting index of the k
// closest numbers.
// Compare the differences between
// x and the middle elements.
// Adjust the pointers l and r based on the comparison.

// The condition if (x - a[m] > a[m + k] - x)
// is used to determine which half of the array
// to search next in the binary search.
//  It compares the differences between
// the target value x and the elements
// at indices m and m + k.
