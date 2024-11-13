// https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/
// https://www.youtube.com/watch?v=ycAq8iqh0TI
// Given an integer array nums sorted in non-decreasing order,
// remove some duplicates in-place such
// that each unique element appears at most twice.
// The relative order of the elements should be kept the same.

// Example 1:

// Input: nums = [1,1,1,2,2,3]
// Output: 5, nums = [1,1,2,2,3,_]

const removeDuplicates2 = (nums) => {
  let l = 0 // Pointer to place the next unique element
  let r = 0 // Pointer to iterate through the array

  while (r < nums.length) {
    let count = 1 // Count occurrences of the current element
    // Count the occurrences of the current element
    while (r < nums.length - 1 && nums[r] === nums[r + 1]) {
      r++
      count++
    }

    // Place the element up to twice in the array
    for (let i = 0; i < Math.min(2, count); i++) {
      nums[l] = nums[r]
      l++
    }

    r++ // Move to the next element
  }

  return l // Return the length of the modified array
}
