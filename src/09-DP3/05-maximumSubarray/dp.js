// 53. Maximum Subarray
// https://leetcode.com/problems/maximum-subarray/description/?envType=problem-list-v2&envId=dynamic-programming
// Problem Description:
// Given an integer array nums, find the subarray with the largest sum, and return its sum.
// A subarray is a contiguous non-empty sequence of elements within an array.
//
// Example 1:
// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
//
// Example 2:
// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.
//
// Example 3:
// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
//
// Constraints:
// 1 <= nums.length <= 10^5
// -10^4 <= nums[i] <= 10^4

/**
 * Dynamic Programming solution for Maximum Subarray (Kadane's Algorithm)
 * This approach uses optimal substructure: maximum subarray ending at position i
 * can be computed from maximum subarray ending at position i-1
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum subarray sum
 */
function maxSubArray(nums) {
    // Handle edge case: empty array (though constraints guarantee non-empty)
    if (nums.length === 0) return 0;
    
    // Initialize maxEndingHere to track maximum sum ending at current position
    let maxEndingHere = nums[0];
    
    // Initialize maxSoFar to track maximum sum found so far across all positions
    let maxSoFar = nums[0];
    
    // Iterate through array starting from second element
    for (let i = 1; i < nums.length; i++) {
        // For each position, decide whether to extend existing subarray or start new one
        // maxEndingHere represents maximum sum of subarray ending at current position
        // Either extend previous subarray by including current element
        // Or start fresh subarray from current element if previous sum is negative
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        
        // Update global maximum if current ending sum is better
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    // Return the maximum subarray sum found across entire array
    return maxSoFar;
}

/**
 * Alternative DP solution with explicit state tracking
 * This version maintains a DP array to show the state transition clearly
 * @param {number[]} nums - Array of integers  
 * @return {number} - Maximum subarray sum
 */
function maxSubArrayWithDP(nums) {
    // Create DP array where dp[i] represents maximum sum ending at position i
    const dp = new Array(nums.length);
    
    // Base case: first element can only form subarray of itself
    dp[0] = nums[0];
    
    // Track overall maximum sum across all positions
    let maxSum = dp[0];
    
    // Fill DP array using optimal substructure property
    for (let i = 1; i < nums.length; i++) {
        // dp[i] = max(nums[i], dp[i-1] + nums[i])
        // Either start new subarray at current element or extend previous subarray
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        
        // Update global maximum if current position yields better result
        maxSum = Math.max(maxSum, dp[i]);
    }
    
    // Return the maximum subarray sum
    return maxSum;
}

/**
 * Space-optimized DP solution
 * Since we only need previous state, we can optimize space from O(n) to O(1)
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum subarray sum  
 */
function maxSubArrayOptimized(nums) {
    // Previous maximum ending here (represents dp[i-1])
    let prevMaxEndingHere = nums[0];
    
    // Global maximum sum found so far
    let globalMax = nums[0];
    
    // Process each element starting from index 1
    for (let i = 1; i < nums.length; i++) {
        // Current maximum ending here (represents dp[i])
        const currentMaxEndingHere = Math.max(nums[i], prevMaxEndingHere + nums[i]);
        
        // Update global maximum if current is better
        globalMax = Math.max(globalMax, currentMaxEndingHere);
        
        // Update previous for next iteration
        prevMaxEndingHere = currentMaxEndingHere;
    }
    
    // Return maximum subarray sum
    return globalMax;
}

// Example usage:
// console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Output: 6
// console.log(maxSubArrayWithDP([1])); // Output: 1
// console.log(maxSubArrayOptimized([5,4,-1,7,8])); // Output: 23