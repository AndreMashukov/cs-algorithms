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

const sortColors = (nums) => {
  // Initialize pointers for the left and right boundaries
  let left = 0
  let right = nums.length - 1
  let i = 0

  // Iterate through the array
  while (i <= right) {
    if (nums[i] === 0) {
      // If the current element is 0, swap it with the element at the left pointer
      [nums[i], nums[left]] = [nums[left], nums[i]]
      left++ // Move the left pointer to the right
      i++ // Move to the next element
    } else if (nums[i] === 2) {
      // If the current element is 2, swap it with the element at the right pointer
      [nums[i], nums[right]] = [nums[right], nums[i]]
      right-- // Move the right pointer to the left
    } else {
      // If the current element is 1, just move to the next element
      i++
    }
  }
  return nums // Return the sorted array
}

// The solution uses a three-pointer approach to sort the array in-place.
// The pointers left and right are used to keep track of the boundaries
// for the colors red (0) and blue (2), respectively.
// The pointer i is used to iterate through the array.
// The algorithm swaps elements to ensure that all 0s are moved
// to the beginning and all 2s are moved to the end,
// while 1s remain in the middle.
// This approach ensures that the array is sorted in a single pass
// with a time complexity of O(n).

// When nums[i] === 2, we swap the current element
// with the element at the right pointer and then decrement the right pointer. 
// We do not increment i in this case because the element 
// that was swapped from the right pointer 
// to the current position i has not been processed yet. 
// By not incrementing i, we ensure that this new element is checked
// in the next iteration of the loop. This is necessary because 
// the new element could be a 0, 1, or another 2, 
// and we need to handle it accordingly.