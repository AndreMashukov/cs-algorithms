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
    res.push([...cur])

    for (let j = i; j < nums.length; j++) {
      // if value is the same as the previous value, skip it
      if (j > i && nums[j] === nums[j - 1]) {
        continue
      }

      cur.push(nums[j])
      dfs(j + 1, cur)
      cur.pop()
    }
  }

  dfs(0, [])
  return res
}

console.log(subsetsWithDup([1, 2, 2]))

// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
