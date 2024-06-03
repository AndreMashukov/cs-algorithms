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
    nums.sort((a, b) => b - a)

    return this.dfs(nums, target, 0)
  }

  dfs (nums, target, index) {
    if (target === 0) {
      return true
    }

    if (target < 0 || index === nums.length) {
      return false
    }

    if (this.dfs(nums, target - nums[index], index + 1)) {
      return true
    }

    let nextIndex = index + 1
    while (nextIndex < nums.length && nums[nextIndex] === nums[index]) {
      nextIndex++
    }

    return this.dfs(nums, target, nextIndex)
  }
}

console.log(new Solution().canPartition([1, 2, 3, 4])) // true
