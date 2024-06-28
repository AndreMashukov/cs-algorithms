// Given an integer array nums that may contain duplicates,
// return all possible
// subsets
//  (the power set).

// The solution set must not contain duplicate subsets.
// Return the solution in any order.

const subsetsWithDup = (nums) => {
  const res = []

  nums.sort((a, b) => a - b)

  const dfs = (i, subset) => {
    if (i === nums.length) {
      res.push([...subset])
      return
    }

    // All subsets that include nums[i]
    subset.push(nums[i])
    dfs(i + 1, subset)
    subset.pop()

    // All subsets that doesn't include nums[i]
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      i++
    }
    dfs(i + 1, subset)
  }

  dfs(0, [])
  return res
}

console.log(subsetsWithDup([1, 2, 2]))

// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
