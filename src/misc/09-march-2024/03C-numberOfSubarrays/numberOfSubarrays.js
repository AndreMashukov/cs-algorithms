// Given an array of integers arr and two integers k and threshold,
// return the number of sub-arrays of size k and average greater
// than or equal to threshold.

// Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
// Output: 3

const numOfSubarrays = (arr, k, threshold) => {
  let count = 0
  let sum = 0

  for (let i = 0; i < k; i++) {
    sum += arr[i]
  }
  // why i <= arr.length?
  // Because the last subarray will be from the last element to the last k elements
  for (let i = k; i <= arr.length; i++) {
    if (sum / k >= threshold) {
      count++
    }
    sum += arr[i] - arr[i - k]
  }

  return count
}
