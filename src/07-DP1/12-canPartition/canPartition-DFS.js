class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  canPartition (nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0)
    if (sum % 2 !== 0) {
      return false
    }

    const target = sum / 2
    // include larger numbers in the subset first
    nums.sort((a, b) => b - a)

    return this.dfs(nums, target, 0)
  }

  // keep track of the remaining sum needed to reach half of the total sum.
  dfs (nums, target, index) {
    if (target === 0) {
      return true
    }

    if (target < 0 || index === nums.length) {
      return false
    }

    // include the current number (nums[index]) in the first subset.
    if (this.dfs(nums, target - nums[index], index + 1)) {
      return true
    }

    let nextIndex = index + 1
    while (nextIndex < nums.length && nums[nextIndex] === nums[index]) {
      nextIndex++
    }

    // not include the current number in the first subset,
    // which means it goes into the second subset
    return this.dfs(nums, target, nextIndex)
  }
}

console.log(new Solution().canPartition([1, 2, 3, 4])) // true
