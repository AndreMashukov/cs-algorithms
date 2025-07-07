// Given an integer array nums, find a subarray
// that has the largest product within the array and return it.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  maxProduct (nums) {
    let res = nums[0]
    let curMin = 1
    let curMax = 1

    for (const n of nums) {
      // If we didn't save the old value of curMax * n in tmp,
      // then when we update curMax,
      // we would lose the old value of curMax * n,
      // which we need to calculate the new value of curMin
      const tmp = curMax * n
      // If the maximum product of the subarray ending at the previous position
      // is negative and n is positive,
      // it's better to start a new subarray at n.
      curMax = Math.max(Math.max(n * curMax, n * curMin), n)
      // So, curMin is important because it allows us to keep track
      // of negative numbers in the array,
      //  which could potentially lead to a large positive product.
      curMin = Math.min(Math.min(tmp, n * curMin), n)
      res = Math.max(res, curMax)
    }
    return res
  }
}

console.log(
  new Solution().maxProduct([2, 3, -2, 4]) // 6
)
