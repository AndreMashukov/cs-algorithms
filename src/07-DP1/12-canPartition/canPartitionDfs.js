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

    // Memoization cache
    const memo = new Map()

    // keep track of the remaining sum needed to reach half of the total sum.
    const dfs = (target, index) => {
      const key = `${target},${index}`
      if (memo.has(key)) {
        return memo.get(key)
      }

      if (target === 0) {
        return true
      }

      if (target < 0 || index === nums.length) {
        return false
      }

      // include the current number (nums[index]) in the first subset.
      if (dfs(target - nums[index], index + 1)) {
        memo.set(key, true)
        return true
      }

      let nextIndex = index + 1
      while (nextIndex < nums.length && nums[nextIndex] === nums[index]) {
        nextIndex++
      }

      // not include the current number in the first subset,
      // which means it goes into the second subset
      const result = dfs(target, nextIndex)
      memo.set(key, result)
      return result
    }

    return dfs(target, 0)
  }
}
