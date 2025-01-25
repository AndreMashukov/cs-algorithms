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
      // console.log({
      //   left,
      //   right,
      //   i,
      //   ans,
      //   newNumsLeft: newNums[left],
      //   newNumsI: newNums[i],
      //   newNumsRight: newNums[right]
      // })
      // Calculate the maximum coins by bursting the ith balloon last
      ans = Math.max(
        ans,
        newNums[left] * newNums[i] * newNums[right] +
          dfs(left, i) +
          dfs(i, right)
      )
    }

    // Store the result in memo
    memo.set(`${left},${right}`, ans)
    return ans
  };

  // Add 1 to both ends of the nums array to handle edge cases
  const newNums = [1, ...nums, 1]

  // Start the DFS from the full range of the newNums array
  return dfs(0, n + 1)
};

console.log(maxCoinsDfs([3, 1, 5, 8])) // 167
console.log(maxCoinsDfs([1, 5])) // 5

//   0 1 2 3
// 1 3 1 5 8 1
// opt(END) = max (
//  1 * 3 * 1 + 0 + opt(1, 3),
//  1 * 1 * 1 + opt(0, 0) + opt(2, 3),
//  1 * 5 * 1 + opt(0, 1) + opt(3, 3),
//  1 * 8 * 1 + opt(0, 2)
// )
// opt(1, 3) = max (
//  3 * 1 * 1 + opt(2, 3),
//  3 * 5 * 1 + opt(1, 2) + opt(3, 3),
//  3 * 8 * 1 + opt(1, 2)
