/**
 * Maximum Product Subarray - Dynamic Programming Solution
 * 
 * Uses modified Kadane's algorithm to track both maximum and minimum products
 * at each position, since negative numbers can make minimum become maximum.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1) optimized, O(n) with DP array
 */

/**
 * DP solution with O(n) space - stores max and min products ending at each position
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum product of any contiguous subarray
 */
function maxProduct(nums) {
    if (!nums || nums.length === 0) return 0;
    
    const n = nums.length;
    
    // dp_max[i] = maximum product ending at position i
    // dp_min[i] = minimum product ending at position i
    const dp_max = new Array(n);
    const dp_min = new Array(n);
    
    // Base case: single element
    dp_max[0] = nums[0];
    dp_min[0] = nums[0];
    let result = nums[0];
    
    // Fill DP arrays
    for (let i = 1; i < n; i++) {
        // At each position, we can either:
        // 1. Start a new subarray (just nums[i])
        // 2. Extend previous max subarray (dp_max[i-1] * nums[i])
        // 3. Extend previous min subarray (dp_min[i-1] * nums[i])
        
        const option1 = nums[i];
        const option2 = dp_max[i - 1] * nums[i];
        const option3 = dp_min[i - 1] * nums[i];
        
        dp_max[i] = Math.max(option1, option2, option3);
        dp_min[i] = Math.min(option1, option2, option3);
        
        // Update global maximum
        result = Math.max(result, dp_max[i]);
    }
    
    return result;
}

/**
 * Space-optimized DP solution with O(1) space
 * Only keeps track of previous max and min, not entire arrays
 */
function maxProductOptimized(nums) {
    if (!nums || nums.length === 0) return 0;
    
    // Track max and min products ending at current position
    let maxEndingHere = nums[0];
    let minEndingHere = nums[0];
    let maxSoFar = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Store current values before updating
        const tempMax = maxEndingHere;
        
        // Update max and min ending at current position
        maxEndingHere = Math.max(nums[i], tempMax * nums[i], minEndingHere * nums[i]);
        minEndingHere = Math.min(nums[i], tempMax * nums[i], minEndingHere * nums[i]);
        
        // Update global maximum
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

/**
 * Alternative DP approach: scan from both directions
 * Handles the case where odd number of negative numbers causes issues
 */
function maxProductBidirectional(nums) {
    if (!nums || nums.length === 0) return 0;
    
    const n = nums.length;
    let maxProduct = nums[0];
    
    // Left to right scan
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        leftProduct *= nums[i];
        maxProduct = Math.max(maxProduct, leftProduct);
        
        // Reset on zero
        if (leftProduct === 0) {
            leftProduct = 1;
        }
    }
    
    // Right to left scan
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        rightProduct *= nums[i];
        maxProduct = Math.max(maxProduct, rightProduct);
        
        // Reset on zero
        if (rightProduct === 0) {
            rightProduct = 1;
        }
    }
    
    return maxProduct;
}

/**
 * DP solution that tracks all possible subarray products (less efficient)
 * Demonstrates the full DP approach for educational purposes
 */
function maxProductAllSubarrays(nums) {
    if (!nums || nums.length === 0) return 0;
    
    const n = nums.length;
    // dp[i][j] = product of subarray from i to j
    const dp = Array(n).fill(null).map(() => Array(n).fill(0));
    let maxProduct = nums[0];
    
    // Base case: single elements
    for (let i = 0; i < n; i++) {
        dp[i][i] = nums[i];
        maxProduct = Math.max(maxProduct, dp[i][i]);
    }
    
    // Fill DP table for all subarrays
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = dp[i][j - 1] * nums[j];
            maxProduct = Math.max(maxProduct, dp[i][j]);
        }
    }
    
    return maxProduct;
}

// Test cases
console.log("=== Maximum Product Subarray - Dynamic Programming Solutions ===");

// Test case 1: Basic example
const nums1 = [2, 3, -2, 4];
console.log(`\nTest 1: [${nums1.join(', ')}]`);
console.log(`DP Array Solution: ${maxProduct(nums1)}`);
console.log(`Optimized DP: ${maxProductOptimized(nums1)}`);
console.log(`Bidirectional DP: ${maxProductBidirectional(nums1)}`);
console.log(`All Subarrays DP: ${maxProductAllSubarrays(nums1)}`);

// Test case 2: Array with zero
const nums2 = [-2, 0, -1];
console.log(`\nTest 2: [${nums2.join(', ')}]`);
console.log(`DP Array Solution: ${maxProduct(nums2)}`);
console.log(`Optimized DP: ${maxProductOptimized(nums2)}`);
console.log(`Bidirectional DP: ${maxProductBidirectional(nums2)}`);

// Test case 3: All negative numbers
const nums3 = [-4, -3, -2];
console.log(`\nTest 3: [${nums3.join(', ')}]`);
console.log(`DP Array Solution: ${maxProduct(nums3)}`);
console.log(`Optimized DP: ${maxProductOptimized(nums3)}`);
console.log(`Bidirectional DP: ${maxProductBidirectional(nums3)}`);

// Test case 4: Edge case - single negative number
const nums4 = [-1];
console.log(`\nTest 4: [${nums4.join(', ')}]`);
console.log(`DP Array Solution: ${maxProduct(nums4)}`);
console.log(`Optimized DP: ${maxProductOptimized(nums4)}`);

// Test case 5: Complex case with multiple negatives and zero
const nums5 = [2, -5, -2, -4, 3, 0, -1, -2];
console.log(`\nTest 5: [${nums5.join(', ')}]`);
console.log(`DP Array Solution: ${maxProduct(nums5)}`);
console.log(`Optimized DP: ${maxProductOptimized(nums5)}`);
console.log(`Bidirectional DP: ${maxProductBidirectional(nums5)}`);

module.exports = { 
    maxProduct, 
    maxProductOptimized, 
    maxProductBidirectional, 
    maxProductAllSubarrays 
};