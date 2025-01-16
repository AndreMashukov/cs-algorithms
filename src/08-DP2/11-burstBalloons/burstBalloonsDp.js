// You are given an array of integers nums of size n.
// The ith element represents a balloon with an integer value of nums[i].
// You must burst all of the balloons.

// If you burst the ith balloon,
// you will receive nums[i - 1] * nums[i] * nums[i + 1] coins.
// If i - 1 or i + 1 goes out of bounds of the array,
// then assume the out of bounds value is 1.

// Return the maximum number of coins
// you can receive by bursting all of the balloons.

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  maxCoins (nums) {
    // Cache to store the maximum coins for subproblems
    const cache = new Map()
    // Add 1 to both ends of the nums array to handle edge cases
    const newNums = [1, ...nums, 1]

    // Iterate over all possible subarray lengths
    for (let offset = 2; offset < newNums.length; offset++) {
      // Iterate over all possible starting points of the subarray
      for (let left = 0; left < newNums.length - offset; left++) {
        const right = left + offset
        // Iterate over all possible positions of the last balloon to burst in the subarray
        for (let pivot = left + 1; pivot < right; pivot++) {
          // Calculate the coins obtained by bursting the pivot balloon last
          let coins = newNums[left] * newNums[pivot] * newNums[right]
          // Add the coins obtained from the left and right subproblems
          coins += cache.get(`${left}-${pivot}`) || 0
          coins += cache.get(`${pivot}-${right}`) || 0
          // Update the cache with the maximum coins for the current subarray
          console.log(cache)
          cache.set(
            `${left}-${right}`,
            Math.max(coins, cache.get(`${left}-${right}`) || 0)
          )
        }
      }
    }

    // Return the maximum coins for bursting all balloons
    return cache.get('0-' + (newNums.length - 1)) || 0
  }
}

console.log(new Solution().maxCoins([3, 1, 5, 8])) // 167

// Map(10) {
//   '0-2' => 3,
//   '1-3' => 15,
//   '2-4' => 40,
//   '3-5' => 40,
//   '0-3' => 30,
//   '1-4' => 135,
//   '2-5' => 48,
//   '0-4' => 159,
//   '1-5' => 159,
//   '0-5' => 162
// }
