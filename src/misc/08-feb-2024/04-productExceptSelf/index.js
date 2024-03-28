// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums
// except nums[i].
const productExceptSelf = (nums) => {
  const n = nums.length
  const result = Array(n).fill(1)

  let left = 1
  for (let i = 0; i < n; i++) {
    result[i] = left
    left *= nums[i]
  }

  let right = 1
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= right
    right *= nums[i]
  }

  return result
}
