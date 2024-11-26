// You are given an array of integers nums and an integer k.
// There is a sliding window of size k that starts at the left edge of the array.
// The window slides one position to the right until it reaches the right edge of the array.
// Return a list that contains the maximum element in the window at each step.

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */
  maxSlidingWindow (nums, k) {
    const n = nums.length
    // Output array to store the maximums of each window
    const output = new Array(n - k + 1)
    // Deque to store indices of elements in the current window
    const q = []
    // Left and right pointers for the sliding window
    let l = 0
    let r = 0

    // Iterate through the array with the right pointer
    while (r < n) {
      // Remove elements from the deque that are smaller than the current element
      while (q.length > 0 && nums[q[q.length - 1]] < nums[r]) {
        q.pop()
      }
      // Add the current element's index to the deque
      q.push(r)

      // Remove the leftmost element from the deque if it's outside the window
      if (l > q[0]) {
        q.shift()
      }

      // If the window has reached size k, record the maximum element in the output
      if (r + 1 >= k) {
        output[l] = nums[q[0]]
        // Move the left pointer to the right
        l++
      }
      // Move the right pointer to the right
      r++
    }

    // Return the output array containing the maximums of each window
    return output
  }
}

// Example usage
console.log(new Solution().maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)) // [3, 3, 5, 5, 6, 7]
console.log(new Solution().maxSlidingWindow([1], 1)) // [1]
console.log(new Solution().maxSlidingWindow([1, -1], 1)) // [1, -1]
