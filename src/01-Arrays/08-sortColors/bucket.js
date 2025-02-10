// https://leetcode.com/problems/sort-colors/
// http://youtube.com/watch?v=BOt1DAvR0zI
// Given an array nums with n objects colored red, white, or blue,
// sort them in-place so that objects of the same color are adjacent,
// with the colors in the order red, white, and blue.

// We will use the integers 0, 1, and 2 to represent the color
// red, white, and blue, respectively.

// You must solve this problem without using the library's sort function.

// Example 1:

// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]

const solution = (nums) => {
  const counts = Array(3).fill(0)

  // Count how many times each color appears
  for (let i = 0; i < nums.length; i++) {
    counts[nums[i]] += 1
  }

  // Overwrite nums based on the count of each color
  let i = 0
  for (let n = 0; n < counts.length; n++) {
    for (let j = 0; j < counts[n]; j++) {
      nums[i] = n
      i++
    }
  }
}
