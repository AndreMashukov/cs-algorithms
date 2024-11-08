// leetcode: No. 503 Next Greater Element II 
// https://leetcode.com/problems/next-greater-element-ii/

// Given a circular integer array nums
// (i.e., the next element of nums[nums.length - 1] is nums[0]),
// return the next greater number for every element in nums.

// The next greater number of a number x is the
// first greater number to its traversing-order next in the array,
//  which means you could search circularly
// to find its next greater number.
// If it doesn't exist, return -1 for this number.

// Example 1:
// Input: nums = [1,2,1]
// Output: [2,-1,2]

// Example 2:
// Input: nums = [1,2,3,4,3]
// Output: [2,3,4,-1,4]

const nextGreaterElements = (nums) => {
  const n = nums.length; // Get the length of the input array
  const stack = []; // Initialize an empty stack to keep track of indices
  const res = Array(n).fill(-1); // Initialize the result array with -1

  // Iterate through the array twice to handle the circular nature
  for (let i = 0; i < n * 2; i++) {
    // While the stack is not empty and the current element is greater than the element at the index stored at the top of the stack
    while (stack.length && nums[stack[stack.length - 1]] < nums[i % n]) {
      // Update the result for the index at the top of the stack with the current element
      res[stack.pop()] = nums[i % n];
    }
    // Push the current index (mod n) onto the stack
    stack.push(i % n);
  }

  return res; // Return the result array
}