// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed,
// the only constraint stopping you from robbing
// each of them is that adjacent houses have security systems connected
// and it will automatically contact the police if two adjacent houses
// were broken into on the same night.

// Given an integer array nums representing the amount
// of money of each house, return the maximum amount of money
// you can rob tonight without alerting the police.

// Example 1:
// Input: nums = [2,3,2]
// Output: 4
// Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
// because they are adjacent houses.

const houseRobber = (nums) => {
  const n = nums.length
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(nums[0], nums[1])

  const dp = new Array(n).fill(0)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  // after this dp equals to [2, 3, 0].

  for (let i = 2; i < n; i += 1) {
    // dp[i - 1] = dp[1] = 3 and
    // dp[i - 2] + nums[i] = dp[0] + nums[2] = 2 + 2 = 4
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    // after this dp equals to [2, 3, 4].
  }

  return dp[n - 1]
}

console.log(houseRobber([2, 3, 2]))

// Choices:
// Rob the current house (i),
// Don't rob the current house (i),
