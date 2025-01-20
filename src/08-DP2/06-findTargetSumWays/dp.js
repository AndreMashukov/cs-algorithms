class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  findTargetSumWays (nums, target) {
    // Initialize a map to store the number of ways to achieve each sum
    let dp = new Map()
    dp.set(0, 1) // There is one way to achieve the sum 0,
    // which is to use no elements

    // Iterate over each number in the input array
    for (const num of nums) {
      // Create a new map for the next iteration
      const nextDp = new Map()
      // Iterate over each sum and its count in the current dp map
      for (const [total, count] of dp) {
        // Update the nextDp map with the new sums
        // by adding and subtracting the current number
        nextDp.set(total + num, (nextDp.get(total + num) || 0) + count)
        nextDp.set(total - num, (nextDp.get(total - num) || 0) + count)
      }
      console.log(nextDp)
      // Update dp to be the nextDp for the next iteration
      dp = nextDp
    }
    // Return the number of ways to achieve the target sum,
    // or 0 if it is not possible
    return dp.get(target) || 0
  }
}

// Example usage
console.log(new Solution().findTargetSumWays([1, 1, 1, 1, 1], 3)) // 5

// Map(2) { 1 => 1, -1 => 1 }
// Map(3) { 2 => 1, 0 => 2, -2 => 1 }
// Map(4) { 3 => 1, 1 => 3, -1 => 3, -3 => 1 }
// Map(5) { 4 => 1, 2 => 4, 0 => 6, -2 => 4, -4 => 1 }
// Map(6) { 5 => 1, 3 => 5, 1 => 10, -1 => 10, -3 => 5, -5 => 1 }
