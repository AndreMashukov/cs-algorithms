// Given an array nums of distinct integers,
//  return all the possible permutations.
//  You can return the answer in any order.

const permutations = (nums) => {
  const res = []

  const dfs = (cur) => {
    // console.log(cur)
    if (cur.length === nums.length) {
      res.push([...cur])
      return;
    }

    // start from the beginning of the array.
    // because we want to  start with the first element in the array.
    // if we start from the end
    for (let i = 0; i < nums.length; i++) {
      if (cur.includes(nums[i])) {
        continue
      }

      cur.push(nums[i])
      dfs(cur)
      // backtracking step that allows to explore other permutations.
      cur.pop()
    }
  }

  dfs([])
  return res
};

console.log(permutations([1, 2, 3]))

// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// If we called dfs(cur) after cur.pop(),
// we would be exploring permutations
// that do not include nums[i],
// but we've already done that in previous
// iterations of the loop. So, it would result
// in duplicate permutations and wouldn't correctly
// generate all unique permutations of nums.
