// You are given an array of integers nums of size n.
// The ith element represents a balloon with an integer value of nums[i].
// You must burst all of the balloons.

// If you burst the ith balloon,
// you will receive nums[i - 1] * nums[i] * nums[i + 1] coins.
// If i - 1 or i + 1 goes out of bounds of the array,
// then assume the out of bounds value is 1.

// Return the maximum number of coins
// you can receive by bursting all of the balloons.

const maxCoinsDfs = (nums) => {
  const n = nums.length
  const memo = new Map()

  // Helper function to perform depth-first search
  const dfs = (left, right) => {
    // Base case: no balloons to burst between left and right
    if (left + 1 === right) {
      return 0
    }

    // Check if the result is already computed and stored in memo
    if (memo.has(`${left},${right}`)) {
      return memo.get(`${left},${right}`)
    }

    let ans = 0
    // Iterate through all possible balloons to burst between left and right
    for (let i = left + 1; i < right; i++) {
      // Calculate the maximum coins by bursting the ith balloon last
      ans = Math.max(
        ans,
        newNums[left] * newNums[i] * newNums[right] + dfs(left, i) + dfs(i, right)
      )
    }

    // Store the result in memo
    memo.set(`${left},${right}`, ans)
    return ans
  }

  // Add 1 to both ends of the nums array to handle edge cases
  const newNums = [1, ...nums, 1]

  // Start the DFS from the full range of the newNums array
  return dfs(0, n + 1)
}

console.log(maxCoinsDfs([3, 1, 5, 8])) // 167
console.log(maxCoinsDfs([1, 5])) // 5

// Initial Call:

// 1. dfs(0, 5) is called.
// left = 0, right = 5.
// 2. First Iteration:
// The loop iterates with i from left + 1 to right - 1, i.e., i from 1 to 4.
// For i = 1, the function calls dfs(0, 1) and dfs(1, 5).

// dfs(0, 1): No balloons to burst between indices 0 and 1, returns 0.
// dfs(1, 5): Calculates the maximum coins for bursting balloons between indices 1 and 5.

// nums=[4,2,3,7]
// stdout:

// 0 5 1
// 1 5 2
// 2 5 3
// 3 5 4
// 2 5 4
// 2 4 3
// 1 5 3
// 1 3 2
// 1 5 4
// 1 4 2
// 1 4 3
// 0 5 2
// 0 2 1
// 0 5 3
// 0 3 1
// 0 3 2
// 0 5 4
// 0 4 1
// 0 4 2
// 0 4 3
