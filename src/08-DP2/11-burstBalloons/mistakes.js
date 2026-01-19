/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
  const n = nums.length
  const dp = Array(n + 2).fill().map(() => Array(n + 2).fill(0))
  const newNums = [1, ...nums, 1];
  
  for (let l = n; l >= 0; l--) {
    for (let r = l; r <= n; r++) {
      for (let i = l + 1; i < r; i++) {
        let coins = newNums[i - 1] * newNums[i] * newNums[i + 1];
        coins += dp[l][i] + dp[i][r];
        dp[l][r] = Math.max(dp[l][r], coins) 
      }
    }
  }

  return dp[1][n]
};