// Given an array nums of unique integers,
// return all possible subsets of nums.

const subsets = (nums) => {
  const res = []
  const subset = []

  // Define the dfs function inside the subsets function to create a closure
  const dfs = (i) => {
    // Base case: if the index i is beyond the array length, add the current subset to the result
    if (i >= nums.length) {
      res.push([...subset])
      return
    }
    // Include the current element in the subset
    subset.push(nums[i])
    dfs(i + 1)
    // Backtrack: remove the last element to explore the exclusion path
    subset.pop()
    // Exclude the current element from the subset
    dfs(i + 1)
  }

  // Start the dfs with the initial index 0
  dfs(0)
  return res
}

// Example usage
console.log(subsets([1, 2, 3])) // Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
