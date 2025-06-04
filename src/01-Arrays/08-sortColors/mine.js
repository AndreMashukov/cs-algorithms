// Given an array nums with n objects colored red, white, or blue,
// sort them in-place so that objects of the same color are adjacent,
// with the colors in the order red, white, and blue.

// We will use the integers 0, 1, and 2 to represent the color
// red, white, and blue, respectively.

// You must solve this problem without using the library's sort function.

// Example 1:

// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
  // Initialize a count object to store the frequency of each color
  const count = {}
  // Initialize an array to store the frequency of colors in order 0, 1, 2
  const freq = new Array(3)

  // Count the frequency of each color in the input array
  for (const num of nums) {
    count[num] = (count[num] || 0) + 1
  }

  // Transfer the count object values to the freq array
  for (const n in count) {
    freq[n] = count[n]
  }

  // Create a result array to store the sorted colors
  const res = []
  for (let i = 0; i < 3; i++) {
    if (freq[i]) {
      // Create an array filled with the color i, repeated freq[i] times
      const arr = new Array(freq[i]).fill(i)
      // Append the array to the result array
      res.push(...arr)
    }
  }

  // Log the result array (for debugging purposes)
  console.log(res)

  // Modify the original array in-place with the sorted colors
  res.forEach((r, i) => {
    nums[i] = res[i]
  })
}
