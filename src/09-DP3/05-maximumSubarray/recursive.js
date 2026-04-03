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
 * Recursive solution with memoization for Maximum Subarray
 * This approach uses divide and conquer with memoization to find the maximum subarray sum
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum subarray sum
 */
function maxSubArray(nums) {
    // Create memoization cache to store computed results for overlapping subproblems
    const memo = new Map();
    
    /**
     * Helper function to find maximum subarray sum in a range using divide and conquer
     * @param {number} left - Left boundary of current range (inclusive)
     * @param {number} right - Right boundary of current range (inclusive)
     * @return {number} - Maximum subarray sum in the given range
     */
    function solve(left, right) {
        // Base case: if range contains only one element, return that element
        if (left === right) {
            return nums[left];
        }
        
        // Create unique key for memoization based on range boundaries
        const key = `${left}-${right}`;
        
        // Check if result for this range is already computed and cached
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        // Find the middle point to divide the array into two halves
        const mid = Math.floor((left + right) / 2);
        
        // Recursively find maximum subarray sum in left half
        const leftMax = solve(left, mid);
        
        // Recursively find maximum subarray sum in right half  
        const rightMax = solve(mid + 1, right);
        
        // Find maximum subarray sum that crosses the middle point
        // Start from middle and extend left to find maximum sum ending at mid
        let leftSum = nums[mid];
        let maxLeftSum = leftSum;
        for (let i = mid - 1; i >= left; i--) {
            leftSum += nums[i];
            maxLeftSum = Math.max(maxLeftSum, leftSum);
        }
        
        // Start from middle+1 and extend right to find maximum sum starting at mid+1
        let rightSum = nums[mid + 1];
        let maxRightSum = rightSum;
        for (let i = mid + 2; i <= right; i++) {
            rightSum += nums[i];
            maxRightSum = Math.max(maxRightSum, rightSum);
        }
        
        // Maximum crossing sum is the sum of best left extension and best right extension
        const crossingSum = maxLeftSum + maxRightSum;
        
        // The result is the maximum of left max, right max, and crossing max
        const result = Math.max(leftMax, rightMax, crossingSum);
        
        // Store the computed result in memoization cache for future use
        memo.set(key, result);
        
        // Return the maximum subarray sum for this range
        return result;
    }
    
    // Start the recursive solution with the entire array range
    return solve(0, nums.length - 1);
}

// Example usage:
// console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Output: 6
// console.log(maxSubArray([1])); // Output: 1
// console.log(maxSubArray([5,4,-1,7,8])); // Output: 23