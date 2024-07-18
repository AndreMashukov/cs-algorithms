// Given an array of integers a, your task is to find how many
// of its contiguous subarrays of length m contain a pair
// of integers with a sum equal to k.

// Example

// For a = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7], m = 4, and k = 10, the output should be solution(a, m, k) = 5.

// Let's consider all subarrays of length m = 4 and see which fit the description conditions:

// Subarray a[0..3] = [2, 4, 7, 5] doesn't contain any pair of integers with a sum of k = 10.
// Note that although the pair (a[3], a[3]) has the sum 5 + 5 = 10, it doesn't fit the requirement s ≠ t.
// Subarray a[1..4] = [4, 7, 5, 3] contains the pair (a[2], a[4]), where a[2] + a[4] = 7 + 3 = 10.
// Subarray a[2..5] = [7, 5, 3, 5] contains two pairs (a[2], a[4]) and (a[3], a[5]), both with a sum of k = 10.
// Subarray a[3..6] = [5, 3, 5, 8] contains the pair (a[3], a[5]), where a[3] + a[5] = 5 + 5 = 10.
// Subarray a[4..7] = [3, 5, 8, 5] contains the pair (a[5], a[7]), where a[5] + a[7] = 5 + 5 = 10.
// Subarray a[5..8] = [5, 8, 5, 1] contains the pair (a[5], a[7]), where a[5] + a[7] = 5 + 5 = 10.
// Subarray a[6..9] = [8, 5, 1, 7] doesn't contain any pair with a sum of k = 10.
// So the answer is 5, because there are 5 contiguous subarrays that contain a pair with a sum of k = 10.

// For a = [15, 8, 8, 2, 6, 4, 1, 7], m = 2, and k = 8, the output should be solution(a, m, k) = 2.

const solution = (a, m, k) => {
  let count = 0
  const map = new Map()

  for (let i = 0; i < m; i++) {
    if (map.has(k - a[i])) {
      count++
    }
    map.set(a[i], (map.get(a[i]) || 0) + 1)
  }

  for (let i = m; i < a.length; i++) {
    // a[i - m] represents the start of the sliding window
    if (map.get(a[i - m]) === 0) {
      map.delete(a[i - m])
    } else {
      // removing the start of the SW
      map.set(a[i - m], (map.get(a[i - m]) || 0) - 1)
    }

    if (map.has(k - a[i])) {
      count++
    }
    // setting the end of the SW
    map.set(a[i], (map.get(a[i]) || 0) + 1)
  }

  return count
}

// Initialize a hash map and a counter outside the loop.
// Start a loop from the 0th index to the m-1th index (the first window), and for each number, update the map and the counter.
// Then, for each remaining number in the array,
// remove the number that's sliding out of the window
// from the map and the counter, and add the new number
// that's sliding into the window to the map and the counter.

// 1. Shrink the window from the LEFT
// 2. Update the counter
// 3. Expand the window to the RIGHT

// https://stackblitz.com/edit/vitejs-vite-cwxrah?file=counter.js

console.log(solution([2, 4, 7, 5, 3, 5, 8, 5, 1, 7], 4, 10)) // Should be 5 !!!
