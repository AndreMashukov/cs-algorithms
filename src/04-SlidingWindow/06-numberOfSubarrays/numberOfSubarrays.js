// https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/
// Given an array of integers arr and two integers k and threshold,
// return the number of sub-arrays of size k and average greater
// than or equal to threshold.

// Example:
// Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
// Output: 3

const numOfSubarrays = (arr, k, threshold) => {
  // Initialize count to keep track of the number of valid subarrays
  let count = 0
  // Initialize sum to store the sum of the current window of size k
  let sum = 0

  // Calculate the sum of the first window of size k
  for (let i = 0; i < k; i++) {
    sum += arr[i]
  }

  // Iterate through the array starting from the k-th element
  for (let i = k; i <= arr.length; i++) {
    // Check if the average of the current window is greater than or equal to the threshold
    if (sum / k >= threshold) {
      count++
    }
    // Slide the window to the right by subtracting the element that is left behind
    // and adding the next element in the array
    if (i < arr.length) {
      sum += arr[i] - arr[i - k]
    }
  }

  // Return the count of valid subarrays
  return count
}

// Example usage
console.log(numOfSubarrays([2, 2, 2, 2, 5, 5, 5, 8], 3, 4)) // Output: 3
