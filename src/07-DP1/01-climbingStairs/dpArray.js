class Solution {
  /**
   * @param {number} n
   * @return {number}
   */
  climbStairs (n) {
    if (n === 1) {
      // Only 1 step, there's exactly 1 way to climb
      return 1
    }
    if (n === 2) {
      // For 2 steps, there are 2 ways: (1+1) or (2)
      return 2
    }
    // Initialize an array of size n+1 with zeros
    const dp = new Array(n + 1).fill(0)
    // The top of the stairs has exactly 1 way to reach (base condition)
    dp[n] = 1
    // One step before that has exactly 2 ways to reach
    dp[n - 1] = 2

    for (let i = n - 2; i >= 0; i--) {
      // Each position can be reached from (i+1) or (i+2)
      dp[i] = dp[i + 1] + dp[i + 2]
      // console.log(dp)
    }

    return dp[1]
  }
}
