// Suppose an array of length n sorted in ascending order
// is rotated between 1 and n times. For example,
// the array nums = [0,1,2,4,5,6,7] might become:

// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]]
// 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

// Given the sorted rotated array nums of unique elements,
// return the minimum element of this array.

// You must write an algorithm that runs in O(log n) time.

const minInRotatedArray = (nums) => {
  let l = 0
  let r = nums.length - 1

  while (l < r) {
    const mid = Math.floor((l + r) / 2)

    // If the middle element is greater than the last element,
    if (nums[mid] > nums[r]) l = mid + 1
    // why not mid - 1?
    else r = mid
  }

  return nums[l]
}

// Example 1
console.log(minInRotatedArray([3, 4, 5, 1, 2])) // 1

// By setting r = mid, we ensure that the mid element remains in our search space.
// This is crucial because in a rotated sorted array,
// the pivot point (which is the minimum element) could be at any position,
// including mid.
