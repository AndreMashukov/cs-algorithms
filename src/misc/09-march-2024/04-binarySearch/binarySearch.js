// Given an array of integers nums which is SORTED in ascending order,
// and an integer target, write a function to search target in nums.
// If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.

const solution = (nums, target) => {
  let l = 0
  let r = nums.length - 1

  while (l <= r) {
    // Calculate the middle index
    const mid = Math.floor((l + r) / 2)

    if (nums[mid] === target) return mid
    if (nums[mid] < target) l = mid + 1
    else r = mid - 1
  }

  return -1
}

console.log(solution([-1, 0, 3, 5, 9, 12], 9)) // Outputs: 4
