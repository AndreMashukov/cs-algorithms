// 456. 132 Pattern
// http://www.lintcode.com/problem/132-pattern
// https://www.youtube.com/watch?v=q5ANAl8Z458

// Given an array of n integers nums, a 132 pattern is a subsequence 
// of three integers nums[i], nums[j] and nums[k] such that i < j < k 
// and nums[i] < nums[k] < nums[j].
// Return true if there is a 132 pattern in nums, otherwise, return false.


const find132pattern = (nums) => {
  const n = nums.length; // Get the length of the input array
  const stack = []; // Initialize an empty stack to keep track of potential '3' values
  let two = -Infinity; // Initialize 'two' to keep track of the potential '2' value in the 132 pattern

  // Iterate through the array from right to left
  for (let i = n - 1; i >= 0; i--) {
    // If the current number is less than 'two', a 132 pattern is found
    if (nums[i] < two) {
      return true;
    }
    // While the stack is not empty and the current number is greater than 
    // the top of the stack
    while (stack.length && nums[i] > stack[stack.length - 1]) {
      // Pop from the stack and update 'two' with the popped value
      two = stack.pop();
    }
    // Push the current number onto the stack
    stack.push(nums[i]);
  }

  // If no 132 pattern is found, return false
  return false;
};