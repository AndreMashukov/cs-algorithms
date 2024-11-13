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
  let i = 0
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
