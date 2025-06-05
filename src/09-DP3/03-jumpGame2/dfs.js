// Problem: Jump Game II
// LeetCode URL: https://leetcode.com/problems/jump-game-ii/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// You are given a 0-indexed array of integers nums of length n.
// You are initially positioned at nums[0].
// Each element nums[i] represents the maximum length of a forward jump from index i.
// In other words, if you are at nums[i],
// you can jump to any nums[i + j] where:
// 0 <= j <= nums[i] and i + j < n
// Return the minimum number of jumps to reach nums[n - 1].
// The test cases are generated such that you can reach nums[n - 1].
//
// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2.
// Jump 1 step from index 0 to 1, then 3 steps to the last index.
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
function jumpGameII_dfs(nums) {
  const n = nums.length; // Length of the input array.
  const memo = new Map(); // Memoization to store results of subproblems.

  // Helper DFS function with memoization
  // i: current index in the array
  // Returns: minimum number of jumps to reach the last index from index i
  function dfs(i) {
    // Base case: if we've reached the last index, no more jumps needed
    if (i >= n - 1) {
      return 0; // We're at or past the target, so 0 jumps needed
    }

    // Check if result is already computed for this index
    if (memo.has(i)) {
      return memo.get(i); // Return the memoized result
    }

    let minJumps = Infinity; // Initialize with a large value to find minimum

    // Try all possible jumps from current position i
    // We can jump from 1 step to nums[i] steps
    for (let jump = 1; jump <= nums[i]; jump++) {
      const nextIndex = i + jump; // Calculate the next index after the jump

      // Make sure the next index is within bounds
      if (nextIndex < n) {
        // Recursively find minimum jumps from the next index
        const jumpsFromNext = dfs(nextIndex);

        // Update minimum jumps: 1 (current jump) + jumps from next position
        minJumps = Math.min(minJumps, 1 + jumpsFromNext);
      }
    }

    memo.set(i, minJumps); // Store the result in memoization table
    return minJumps; // Return the minimum number of jumps from index i
  }

  return dfs(0); // Start DFS from index 0
}

// Example Usage:
// console.log(jumpGameII_dfs([2,3,1,1,4])); // Expected output: 2
// console.log(jumpGameII_dfs([2,3,0,1,4])); // Expected output: 2
// console.log(jumpGameII_dfs([1,1,1,1])); // Expected output: 3
// console.log(jumpGameII_dfs([1,2,3])); // Expected output: 2
