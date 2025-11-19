/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
  let l = 0;
  let max = -Infinity;
  let zerosCount = 0;

  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === 0) {
      zerosCount++
    }

    while (zerosCount > 1) {
      if (nums[l] === 0) {
        zerosCount--
      }

      max = Math.max(max, r - l)
      l++
    }
  }

  return max
};