// Given a collection of candidate numbers (candidates)
// and a target number (target),
// find all unique combinations in candidates
// where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

const combinationSum2 = (nums, target) => {
  const res = []

  // sort the candidates array to avoid duplicates
  nums.sort((a, b) => a - b)

  const dfs = (i, cur, sum) => {
    if (sum === 0) {
      res.push([...cur])
      return
    }
    if (sum < 0) return

    let prev = -1
    // iterate through the rest of the candidates array
    for (let j = i; j < nums.length; j++) {
      if (prev === nums[j]) continue

      cur.push(nums[j])
      dfs(j + 1, cur, sum - nums[j])
      cur.pop()
      // For the next iteration, where prev will be used to check for duplicates again.
      prev = nums[j]
    }
  }

  dfs(0, [], target)
  return res
}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))

// Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
