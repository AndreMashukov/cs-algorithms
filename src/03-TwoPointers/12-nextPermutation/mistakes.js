/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  const swap = (nums, i, j) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  const reverse = (nums, i) => {
    let l = i;
    let r = nums.length - 1;
    while (l < r) {
      swap(nums, l, r)
      l++;
      r--;
    }
  }

  let i = nums.length - 2;

  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }

  const pivot = nums[i]
  // console.log(i, pivot)
  if (i >= 0) {
    let j = 0;
    while (j >= 0 && nums[j] <= pivot) {
      j++
    }
    swap(nums, i, j)
  }
  reverse(nums, i + 1)
};