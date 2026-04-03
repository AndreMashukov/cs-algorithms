// Problem: Jump Game II
// LeetCode URL: https://leetcode.com/problems/jump-game-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
// Each element nums[i] represents the maximum length of a forward jump from index i.
// In other words, if you are at nums[i], you can jump to any nums[i + j] where:
// 0 <= j <= nums[i] and i + j < n
// Return the minimum number of jumps to reach nums[n - 1].
// The test cases are generated such that you can reach nums[n - 1].
//
// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
//
// Example 2:
// Input: nums = [2,3,0,1,4]
// Output: 2
//
// Constraints:
// 1 <= nums.length <= 10^4
// 0 <= nums[i] <= 1000
// It's guaranteed that you can reach nums[n - 1].

/**
 * @param {number[]} nums
 * @return {number}
 */
function jumpGameII_dp(nums) {
  const n = nums.length; // Length of the input array.

  if (n <= 1) return 0; // No jumps needed for single element

  // dp[i] represents the minimum number of jumps to reach index i
  const dp = new Array(n).fill(Infinity);
  dp[0] = 0; // No jumps needed to reach starting position

  // Fill the DP table by considering all possible jumps
  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity) continue; // Can't reach position i

    // Try all possible jumps from position i
    for (let jump = 1; jump <= nums[i]; jump++) {
      const nextIndex = i + jump; // Calculate the next index after the jump

      if (nextIndex < n) {
        // Make sure within bounds
        // Update minimum jumps to reach nextIndex
        dp[nextIndex] = Math.min(dp[nextIndex], dp[i] + 1);
      }
    }
  }

  return dp[n - 1]; // Return minimum jumps to reach the last index
}

// Alternative more optimized DP approach using BFS-like logic
function jumpGameII_dp_optimized(nums) {
  const n = nums.length; // Length of the input array.

  // If array has only one element, no jumps needed
  if (n <= 1) {
    return 0;
  }

  let jumps = 0; // Number of jumps taken so far
  let currentEnd = 0; // The farthest index we can reach with current number of jumps
  let farthest = 0; // The farthest index we can reach with one more jump

  // Iterate through the array (excluding the last element as we don't need to jump from it)
  for (let i = 0; i < n - 1; i++) {
    // Update the farthest index we can reach
    farthest = Math.max(farthest, i + nums[i]);

    // If we've reached the end of the current jump range
    if (i === currentEnd) {
      jumps++; // We need to make another jump
      currentEnd = farthest; // Update the range we can reach with this jump

      // If we can already reach the end, we can stop
      if (currentEnd >= n - 1) {
        break;
      }
    }
  }

  return jumps; // Return the total number of jumps needed
}

// Example Usage:
// console.log(jumpGameII_dp([2,3,1,1,4])); // Expected output: 2
// console.log(jumpGameII_dp([2,3,0,1,4])); // Expected output: 2
// console.log(jumpGameII_dp([1,1,1,1])); // Expected output: 3
// console.log(jumpGameII_dp([1,2,3])); // Expected output: 2

// console.log(jumpGameII_dp_optimized([2,3,1,1,4])); // Expected output: 2
// console.log(jumpGameII_dp_optimized([2,3,0,1,4])); // Expected output: 2
