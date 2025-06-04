class Solution {
  /**
   * @param {number[]} arr - An integer array
   * @param {number} k - An integer
   * @param {number} x - The target integer
   * @return {number[]} - An integer array of the k closest numbers
   */
  kClosestNumbers (arr, k, x) {
    // O(N)
    let l = 0 // Left pointer
    let r = arr.length - 1 // Right pointer

    // Reduce the window size to k elements
    while (r - l >= k) {
      // If the left element is closer to x than the right element
      if (Math.abs(arr[l] - x) > Math.abs(arr[r] - x)) {
        l++
      } else {
        r--
      }
    }

    // Return the k closest numbers
    return arr.slice(l, r + 1)
  }
}

// Example usage:
console.log(new Solution().kClosestNumbers([1, 2, 3, 4, 5], 4, 3)) // Expected [1, 2, 3, 4]
console.log(new Solution().kClosestNumbers([1, 2, 3, 4, 5], 4, -1)) // Expected [1, 2, 3, 4]
