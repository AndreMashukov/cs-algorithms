// Given an integer array nums that may contain duplicates,
// return all possible
// subsets
//  (the power set).

// The solution set must not contain duplicate subsets.
// Return the solution in any order.

const subsetsWithDup = (nums) => {
  const res = []

  nums.sort((a, b) => a - b)

  const dfs = (i, cur) => {
    if (i === nums.length) {
      res.push([...cur])
      return
    }

    // All subsets that include nums[i]
    cur.push(nums[i])
    // run dfs with i + 1 which is the next index in the array
    // and the current subset array that includes nums[i]
    dfs(i + 1, cur)
    cur.pop()

    // All subsets that doesn't include nums[i]
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      i++
    }
    // run dfs with i + 1 which is the next index in the array
    // and the current subset array that doesn't include nums[i]
    dfs(i + 1, cur)
  }

  dfs(0, [])
  return res
}

console.log(subsetsWithDup([1, 2, 2]))

// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
