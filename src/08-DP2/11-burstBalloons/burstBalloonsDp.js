class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  maxCoins (nums) {
    const n = nums.length
    // Create a new array with 1s at both ends
    const newNums = new Array(n + 2).fill(1)
    for (let i = 0; i < n; i++) {
      newNums[i + 1] = nums[i]
    }

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
