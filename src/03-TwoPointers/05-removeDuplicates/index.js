// https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
// https://www.youtube.com/watch?v=DEJAZBq0FDA
// Given an integer array nums sorted in non-decreasing order,
// remove the duplicates in-place such that each unique element appears only once.
// The relative order of the elements should be kept the same.
// Then return the number of unique elements in nums.

// Consider the number of unique elements of nums to be k, to get accepted,
//  you need to do the following things:

// Change the array nums such that the first k elements of nums contain
// the unique elements in the order they were present in nums initially.
// The remaining elements of nums are not important as well as the size of nums.
// Return k.

const removeDuplicates = (nums) => {
  // We'll use two pointers: 'l' will track the position of the last unique element,
  // and 'r' will move through each element in the array.
  let l = 0
  // Iterate with 'r' from the second element to the end
  for (let r = 1; r < nums.length; r++) {
    // If we find a new unique element (nums[r] != nums[l]),
    // move 'l' forward and copy the new element into nums[l].
    if (nums[r] !== nums[l]) {
      l++
      nums[l] = nums[r]
    }
  }
  // The number of unique elements is 'l + 1'
  return l + 1
}