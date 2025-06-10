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
 * Recursive solution with memoization for Jump Game
 * This approach uses DFS with memoization to explore all possible paths
 * @param {number[]} nums - Array representing maximum jump lengths
 * @return {boolean} - True if last index is reachable, false otherwise
 */
function canJump(nums) {
    // Create memoization cache to store results for each position
    const memo = new Map();
    
    // Target position is the last index
    const target = nums.length - 1;
    
    /**
     * Recursive helper function to check if target is reachable from current position
     * @param {number} position - Current position in the array
     * @return {boolean} - True if target is reachable from this position
     */
    function canReachTarget(position) {
        // Base case: if we've reached or passed the target, return true
        if (position >= target) {
            return true;
        }
        
        // Check if result for this position is already computed and cached
        if (memo.has(position)) {
            return memo.get(position);
        }
        
        // Get maximum jump length from current position
        const maxJump = nums[position];
        
        // If maximum jump is 0, we're stuck and cannot proceed
        if (maxJump === 0) {
            memo.set(position, false);
            return false;
        }
        
        // Try all possible jumps from 1 to maxJump
        for (let jump = 1; jump <= maxJump; jump++) {
            // Calculate next position after making this jump
            const nextPosition = position + jump;
            
            // Recursively check if target is reachable from next position
            if (canReachTarget(nextPosition)) {
                // If any path leads to target, cache the result and return true
                memo.set(position, true);
                return true;
            }
        }
        
        // If no jump from current position leads to target, cache false result
        memo.set(position, false);
        return false;
    }
    
    // Start the recursive search from position 0
    return canReachTarget(0);
}

/**
 * Alternative recursive approach with explicit path tracking
 * This version also demonstrates how to track the actual path taken
 * @param {number[]} nums - Array representing maximum jump lengths
 * @return {boolean} - True if last index is reachable
 */
function canJumpWithPath(nums) {
    // Memoization for position reachability
    const memo = new Map();
    
    // Target is the last index
    const target = nums.length - 1;
    
    /**
     * Helper function that also tracks the path taken
     * @param {number} position - Current position
     * @param {number[]} path - Array tracking positions visited
     * @return {boolean} - True if target reachable
     */
    function solve(position, path = []) {
        // Base case: reached or exceeded target
        if (position >= target) {
            return true;
        }
        
        // Check memoization cache
        if (memo.has(position)) {
            return memo.get(position);
        }
        
        // Add current position to path
        path.push(position);
        
        // Get maximum jump length from current position
        const maxJump = nums[position];
        
        // Try each possible jump length
        for (let jump = 1; jump <= maxJump; jump++) {
            const nextPos = position + jump;
            
            // Recursively explore this path
            if (solve(nextPos, [...path])) {
                memo.set(position, true);
                return true;
            }
        }
        
        // No successful path found from this position
        memo.set(position, false);
        return false;
    }
    
    // Start recursion from position 0
    return solve(0);
}

// Example usage:
// console.log(canJump([2,3,1,1,4])); // Output: true
// console.log(canJump([3,2,1,0,4])); // Output: false
// console.log(canJumpWithPath([2,3,1,1,4])); // Output: true