// 55. Jump Game
// https://leetcode.com/problems/jump-game/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given an integer array nums. You are initially positioned at the array's first index,
// and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.
//
// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
//
// Example 2:
// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
//
// Constraints:
// 1 <= nums.length <= 10^4
// 0 <= nums[i] <= 10^5

/**
 * Dynamic Programming solution for Jump Game
 * This approach builds up solution by tracking reachability of each position
 * @param {number[]} nums - Array representing maximum jump lengths
 * @return {boolean} - True if last index is reachable, false otherwise
 */
function canJump(nums) {
  // Create DP array where dp[i] represents if position i is reachable
  const dp = new Array(nums.length).fill(false);

  // Base case: starting position is always reachable
  dp[0] = true;

  // Process each position from left to right
  for (let i = 0; i < nums.length; i++) {
    // Skip if current position is not reachable
    if (!dp[i]) {
      continue;
    }

    // Get maximum jump length from current position
    const maxJump = nums[i];

    // Mark all positions reachable from current position
    for (let jump = 1; jump <= maxJump; jump++) {
      const nextPosition = i + jump;

      // Check bounds and mark position as reachable
      if (nextPosition < nums.length) {
        dp[nextPosition] = true;

        // Early termination: if we can reach the last index, return true
        if (nextPosition === nums.length - 1) {
          return true;
        }
      }
    }
  }

  // Return whether the last position is reachable
  return dp[nums.length - 1];
}

/**
 * Optimized Greedy solution for Jump Game
 * This approach tracks the farthest reachable position while iterating
 * More efficient than DP as it runs in O(n) time with O(1) space
 * @param {number[]} nums - Array representing maximum jump lengths
 * @return {boolean} - True if last index is reachable
 */
function canJumpGreedy(nums) {
  // Track the farthest position we can reach so far
  let farthest = 0;

  // Iterate through array (no need to check last position)
  for (let i = 0; i < nums.length - 1; i++) {
    // If current position is beyond farthest reachable, we're stuck
    if (i > farthest) {
      return false;
    }

    // Update farthest reachable position from current position
    farthest = Math.max(farthest, i + nums[i]);

    // Early termination: if we can already reach the end, return true
    if (farthest >= nums.length - 1) {
      return true;
    }
  }

  // Check if we can reach the last position
  return farthest >= nums.length - 1;
}

/**
 * Bottom-up DP solution working backwards from the end
 * This approach determines reachability by working from target backwards
 * @param {number[]} nums - Array representing maximum jump lengths
 * @return {boolean} - True if last index is reachable
 */
function canJumpBottomUp(nums) {
  // Start from the last position (which is always reachable from itself)
  let lastGoodPosition = nums.length - 1;

  // Work backwards through the array
  for (let i = nums.length - 2; i >= 0; i--) {
    // Check if we can reach the last known good position from current position
    if (i + nums[i] >= lastGoodPosition) {
      // Update the last good position to current position
      lastGoodPosition = i;
    }
  }

  // If the last good position is the start, then we can reach the end
  return lastGoodPosition === 0;
}

/**
 * Space-optimized DP solution with explicit state tracking
 * This version shows the DP table construction more clearly
 * @param {number[]} nums - Array representing maximum jump lengths
 * @return {boolean} - True if last index is reachable
 */
function canJumpDPExplicit(nums) {
  const n = nums.length;

  // Handle edge case: single element array
  if (n <= 1) return true;

  // DP array: dp[i] = true if we can reach position i
  const dp = Array(n).fill(false);
  dp[0] = true; // Starting position is reachable

  // Fill DP table
  for (let i = 0; i < n; i++) {
    // Skip unreachable positions
    if (!dp[i]) continue;

    // From position i, we can reach i+1, i+2, ..., i+nums[i]
    const maxReach = Math.min(i + nums[i], n - 1);

    // Mark all reachable positions
    for (let j = i + 1; j <= maxReach; j++) {
      dp[j] = true;
    }

    // Early exit if we've reached the end
    if (dp[n - 1]) return true;
  }

  return dp[n - 1];
}

// Example usage:
// console.log(canJump([2,3,1,1,4])); // Output: true
// console.log(canJumpGreedy([3,2,1,0,4])); // Output: false
// console.log(canJumpBottomUp([2,3,1,1,4])); // Output: true
