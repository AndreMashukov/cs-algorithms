class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  maxCoins (nums) {
    const n = nums.length
    // Create a new array with 1s at both ends
    const newNums = [1, ...nums, 1]

    // Initialize DP table with 0s
    const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0))

    // Fill the DP table
    // l represents the left boundary of the subarray
    for (let l = n; l >= 1; l--) {
      // r represents the right boundary of the subarray
      for (let r = l; r <= n; r++) {
        // i represents the position of the last balloon to burst in the subarray
        for (let i = l; i <= r; i++) {
          // Calculate coins obtained by bursting balloon i last in the subarray
          let coins = newNums[l - 1] * newNums[i] * newNums[r + 1]
          // Add coins obtained from previously burst balloons in the subarray
          coins += dp[l][i - 1] + dp[i + 1][r]
          // Update the DP table with the maximum coins obtained
          dp[l][r] = Math.max(dp[l][r], coins)
        }
      }
    }

    // The result is stored in dp[1][n], which represents bursting all balloons
    return dp[1][n]
  }
}

console.log(new Solution().maxCoins([4, 2, 3, 7])) // 143


// nums=[4,2,3,7]
// stdout:

// [
//   [ 0, 0, 0, 0, 0, 0 ],
//   [ 0, 8, 36, 136, 143, 0 ],
//   [ 0, 0, 24, 108, 136, 0 ],
//   [ 0, 0, 0, 42, 56, 0 ],
//   [ 0, 0, 0, 0, 21, 0 ],
//   [ 0, 0, 0, 0, 0, 0 ]
// ]