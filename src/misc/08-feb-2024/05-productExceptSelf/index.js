// Given an integer array nums, return an array answer
// such that answer[i] is equal to the product of all the elements of nums
// except nums[i].

// nums = [1,2,3,4]
// result = [24, 12, 8, 6].

const productExceptSelf = (nums) => {
  const n = nums.length;
  const result = Array(n).fill(1);

  // the product of all elements to the left
  // of the current element
  let left = 1;
  for (let i = 0; i < n; i++) {
    result[i] = left;
    // we update left to include nums[i] for the next iteration.
    left *= nums[i];
  }

  // Now result is [1, 1, 2, 6].

  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    // include the product of the numbers to the right of nums[i] in result[i].
    result[i] *= right;
    right *= nums[i];
  }

  return result;
};

// he left variable accumulates the product
// of all elements to the left of the current element.
// It starts at 1 (since there are no elements
// to the left of the first element)
// and gets multiplied by each element in turn.
//  This product is then stored in the result array
// before left is updated with the current element.
//  This way, the product stored in result
// for each index does not include the current element.
