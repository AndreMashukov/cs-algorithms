// 31. Next Permutation
// A permutation of an array of integers is an arrangement of its members
// into a sequence or linear order.

// For example, for arr = [1,2,3], the following are all the permutations of
//  arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
// The next permutation of an array of integers is
// the next lexicographically greater permutation of its integer.
//  More formally, if all the permutations of the array
// are sorted in one container according to their lexicographical order,
// then the next permutation of that array is the permutation that follows
//  it in the sorted container. If such arrangement is not possible,
// the array must be rearranged as the lowest possible order
//  (i.e., sorted in ascending order).

// For example, the next permutation of arr = [1,2,3] is [1,3,2].
// Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
// While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1]
// does not have a lexicographical larger rearrangement.
// Given an array of integers nums, find the next permutation of nums.

// The replacement must be in place and use only constant extra memory.

// Example 1:

// Input: nums = [1,2,3]
// Output: [1,3,2]
// Example 2:

// Input: nums = [3,2,1]
// Output: [1,2,3]

const swap = (nums, i, j) => {
  const temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

const reverse = (nums, start) => {
  let i = start
  let j = nums.length - 1
  while (i < j) {
    swap(nums, i, j)
    i++
    j--
  }
}

const nextPermutation = function (nums) {
  let i = nums.length - 2

  // Find the first decreasing element from the end
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }

  // If i is not the first element, swap the element with the next larger element.
  if (i >= 0) {
    let j = nums.length - 1

    // Find the element just larger than nums[i]
    while (j >= 0 && nums[j] <= nums[i]) {
      j--
    }

    // Swap the elements at i and j
    swap(nums, i, j)
  }

  // Reverse the elements from i + 1 to the end of the array
  reverse(nums, i + 1)

  return nums
}

// 1 2 3 4 5  - minimum
// 5 4 3 2 1  - maximum

// 1 3 5 4 3 2 1
// 5 4 3 2 1 - longest decreasing suffix
// 3 - pivot
// 4 - first element larger than pivot
// swap 3 and 4
// 1 4 5 3 3 2 1
// sort the suffix
// 5 3 3 2 1 -> 1 2 3 3 5
// 1 4 1 3 3 5 - next permutation

// 1. find the pivot
// 2. find the first element larger than pivot
// 3. swap pivot and the first element larger than pivot
// 4. reverse the suffix
