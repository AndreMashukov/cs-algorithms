// 962. Maximum Width Ramp
// https://leetcode.com/problems/maximum-width-ramp/description
// https://www.youtube.com/watch?v=3pTEJ1vzgSI
// A ramp in an integer array nums is a pair (i, j) for which i < j
// and nums[i] <= nums[j]. The width of such a ramp is j - i.

// Given an integer array nums, return the maximum width of a ramp in nums.
// If there is no ramp in nums, return 0.

const maxWidthRamp = (nums) => {
  const st = []
  let res = 0

  for (let i = 0; i < nums.length; i++) {
    if (!st.length || nums[st[st.length - 1]] > nums[i]) {
      st.push(i)
    }
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    while (st.length && nums[st[st.length - 1]] <= nums[i]) {
      res = Math.max(res, i - st.pop())
    }
  }

  return res
}

console.log(maxWidthRamp([6, 0, 8, 2, 1, 5])) // 4; from 1 to 5;
