/**
 * Maximum Product Subarray - Recursive Solution with Memoization
 * 
 * Given an integer array nums, find a contiguous non-empty subarray within the array 
 * that has the largest product, and return the product.
 * 
 * Time Complexity: O(n^2) with memoization
 * Space Complexity: O(n^2) for memoization cache
 */

/**
 * Main function to find maximum product subarray using recursive approach
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum product of any contiguous subarray
 */
function maxProduct(nums) {
    if (!nums || nums.length === 0) return 0;
    
    const n = nums.length;
    // Memoization cache: key = "startIndex,endIndex", value = {max, min}
    const memo = new Map();
    let globalMax = nums[0];
    
    // Helper function to recursively compute max and min product for subarray
    function dfs(start, end) {
        // Base case: single element
        if (start === end) {
            return { max: nums[start], min: nums[start] };
        }
        
        // Check memoization cache
        const key = `${start},${end}`;
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        // Recursive case: try all possible splits
        let maxProduct = -Infinity;
        let minProduct = Infinity;
        
        // Try splitting at each position between start and end
        for (let split = start; split < end; split++) {
            // Get products for left and right subarrays
            const left = dfs(start, split);
            const right = dfs(split + 1, end);
            
            // Calculate all possible products by combining left and right
            const products = [
                left.max * right.max,
                left.max * right.min,
                left.min * right.max,
                left.min * right.min
            ];
            
            // Update max and min products
            maxProduct = Math.max(maxProduct, ...products);
            minProduct = Math.min(minProduct, ...products);
        }
        
        // Also consider the current element alone and extending from previous elements
        const currentElement = nums[start];
        if (start < end) {
            const rightPart = dfs(start + 1, end);
            maxProduct = Math.max(maxProduct, currentElement, currentElement * rightPart.max, currentElement * rightPart.min);
            minProduct = Math.min(minProduct, currentElement, currentElement * rightPart.max, currentElement * rightPart.min);
        }
        
        const result = { max: maxProduct, min: minProduct };
        memo.set(key, result);
        return result;
    }
    
    // Try all possible subarrays
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const result = dfs(i, j);
            globalMax = Math.max(globalMax, result.max);
        }
    }
    
    return globalMax;
}

/**
 * Alternative recursive approach using Kadane's algorithm pattern
 * More efficient recursive solution that tracks max and min ending at each position
 */
function maxProductKadane(nums) {
    if (!nums || nums.length === 0) return 0;
    
    const memo = new Map();
    
    // Helper function: returns {max, min} ending at position i
    function dfs(i) {
        // Base case
        if (i === 0) {
            return { max: nums[0], min: nums[0] };
        }
        
        // Check memoization
        if (memo.has(i)) {
            return memo.get(i);
        }
        
        // Get result from previous position
        const prev = dfs(i - 1);
        
        // Current element can be:
        // 1. Start of new subarray (just nums[i])
        // 2. Extension of previous max subarray (prev.max * nums[i])
        // 3. Extension of previous min subarray (prev.min * nums[i])
        const candidates = [nums[i], prev.max * nums[i], prev.min * nums[i]];
        
        const result = {
            max: Math.max(...candidates),
            min: Math.min(...candidates)
        };
        
        memo.set(i, result);
        return result;
    }
    
    let maxProduct = nums[0];
    
    // Check max product ending at each position
    for (let i = 0; i < nums.length; i++) {
        const result = dfs(i);
        maxProduct = Math.max(maxProduct, result.max);
    }
    
    return maxProduct;
}

// Test cases
console.log("=== Maximum Product Subarray - Recursive Solutions ===");

// Test case 1: Basic example with negative numbers
const nums1 = [2, 3, -2, 4];
console.log(`\nTest 1: [${nums1.join(', ')}]`);
console.log(`Recursive Result: ${maxProduct(nums1)}`);
console.log(`Kadane Recursive Result: ${maxProductKadane(nums1)}`);
// Expected: 6 (subarray [2,3])

// Test case 2: Array with zeros
const nums2 = [-2, 0, -1];
console.log(`\nTest 2: [${nums2.join(', ')}]`);
console.log(`Recursive Result: ${maxProduct(nums2)}`);
console.log(`Kadane Recursive Result: ${maxProductKadane(nums2)}`);
// Expected: 0

// Test case 3: All negative numbers (even count)
const nums3 = [-2, -3, -4];
console.log(`\nTest 3: [${nums3.join(', ')}]`);
console.log(`Recursive Result: ${maxProduct(nums3)}`);
console.log(`Kadane Recursive Result: ${maxProductKadane(nums3)}`);
// Expected: 12 (subarray [-2,-3] = 6 or [-3,-4] = 12)

// Test case 4: Single element
const nums4 = [-2];
console.log(`\nTest 4: [${nums4.join(', ')}]`);
console.log(`Recursive Result: ${maxProduct(nums4)}`);
console.log(`Kadane Recursive Result: ${maxProductKadane(nums4)}`);
// Expected: -2

// Test case 5: Mixed positive and negative
const nums5 = [2, -5, -2, -4, 3];
console.log(`\nTest 5: [${nums5.join(', ')}]`);
console.log(`Recursive Result: ${maxProduct(nums5)}`);
console.log(`Kadane Recursive Result: ${maxProductKadane(nums5)}`);
// Expected: 24 (subarray [-5,-2,-4] = 40 or [2,-5,-2,-4] = 80)

module.exports = { maxProduct, maxProductKadane };