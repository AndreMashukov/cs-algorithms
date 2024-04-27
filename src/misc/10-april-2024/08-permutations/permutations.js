// Given an array nums of distinct integers,
//  return all the possible permutations.
//  You can return the answer in any order.

const permutations = (nums) => {
  const res = []

  const dfs = (cur) => {
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
      cur.pop()
    }
  }

  dfs([])
  return res
};

console.log(permutations([1, 2, 3]))

// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
