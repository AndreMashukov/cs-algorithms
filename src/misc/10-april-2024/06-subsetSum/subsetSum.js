// Given an integer array nums of unique elements, return all possible
// subsets
//  (the power set).

// The solution set must not contain duplicate subsets.
// Return the solution in any order.

// Example 1:

// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

const subsetSum = (nums) => {
  const result = []
  // path - the current path, which is an array of numbers
  // index - the current index in the nums array
  const dfs = (index, path) => {
    // push the path to the result
    result.push(path)
    // console.log(index, result)
    for (let i = index; i < nums.length; i++) {
      // include the current number in the path
      // and call dfs recursively with the next index
      dfs(i + 1, [...path, nums[i]])
    }
  }
  dfs(0, [])
  return result
}

console.log(subsetSum([1, 2, 3]))

// 0 [ [] ]
// 1 [ [], [ 1 ] ]
// 2 [ [], [ 1 ], [ 1, 2 ] ]
// 3 [ [], [ 1 ], [ 1, 2 ], [ 1, 2, 3 ] ]
// ...
