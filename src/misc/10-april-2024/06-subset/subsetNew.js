// Given an array nums of unique integers,
//  return all possible subsets of nums.

class Solution {
  subsets (nums) {
    const res = []
    const subset = []
    this.dfs(nums, 0, subset, res)
    return res
  }

  dfs (nums, i, subset, res) {
    if (i >= nums.length) {
      res.push([...subset])
      return
    }
    subset.push(nums[i])
    this.dfs(nums, i + 1, subset, res)
    subset.pop()
    this.dfs(nums, i + 1, subset, res)
  }
}

console.log(
  new Solution().subsets([1, 2, 3])
)
