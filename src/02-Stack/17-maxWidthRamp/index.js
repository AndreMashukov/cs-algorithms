// 962. Maximum Width Ramp
// https://leetcode.com/problems/maximum-width-ramp/description
// https://www.youtube.com/watch?v=3pTEJ1vzgSI
// A ramp in an integer array nums is a pair (i, j) for which i < j
// and nums[i] <= nums[j]. The width of such a ramp is j - i.

// Given an integer array nums, return the maximum width of a ramp in nums.
// If there is no ramp in nums, return 0.

const maxWidthRamp = (nums) => {
  // We'll use a stack to keep track of indices where the array values are
  // strictly decreasing. This helps us find the earliest (smallest index)
  // potential i for each j.
  const st = [];
  // Result holds the maximum width ramp found
  let res = 0;

  // First loop: build the stack with indices of a decreasing sequence
  // from left to right
  for (let i = 0; i < nums.length; i++) {
    // Only push the index if the current num is
    // smaller than or equal to the value at the top of the stack
    if (!st.length || nums[st[st.length - 1]] > nums[i]) {
      st.push(i);
    }
  }

  // console.log(st) // [0, 1]
  // [0] because stack is empty
  // [0, 1] because nums[st[st.length - 1]] > nums[i] -> 6 > 0
  // nums[1] = 0; 0 is smaller than 8 and so on

  // Second loop: iterate from the end of the array to see
  // how far we can go back with a greater or equal value
  for (let i = nums.length - 1; i >= 0; i--) {
    // While the top of the stack is an index whose value
    // is <= current num[i], update the result
    while (st.length && nums[st[st.length - 1]] <= nums[i]) {
      // Calculate the width as current index i minus
      // the earliest valid index from the stack
      res = Math.max(res, i - st.pop());
    }
  }
  // st[1] <= nums[5] -> 5 <= 0 => res = Math.max(res, 5 - 1) = 4
  // st[0] <= nums[5] -> 6 <= 5 false
  // st[0] <= nums[4] -> 6 <= 1 false
  return res;
};
console.log(maxWidthRamp([6, 0, 8, 2, 1, 5])); // 4; from 1 to 5;
// after first loop, stack = [0, 1]
// after second loop, stack = []
