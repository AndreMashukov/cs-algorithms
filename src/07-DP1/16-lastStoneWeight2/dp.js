/**
 * @param {number[]} stones
 * @return {number}
 */
function lastStoneWeightII(stones) {
    // Calculate the total sum of all stones
    const sum = stones.reduce((acc, curr) => acc + curr, 0);
    
    // The target is to find a subset sum as close to sum / 2 as possible
    const target = Math.floor(sum / 2);
    
    // dp[j] will be true if a subset sum of j is possible
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // A sum of 0 is always possible (empty subset)
    
    // Populate the DP array
    for (const stone of stones) {
        // Traverse backwards to prevent using the same stone multiple times
        for (let j = target; j >= stone; j--) {
            dp[j] = dp[j] || dp[j - stone];
        }
    }
    
    // Find the largest possible subset sum that is <= target
    for (let j = target; j >= 0; j--) {
        if (dp[j]) {
            // The remaining weight is the difference between the two subsets:
            // Subset 1: sum - j
            // Subset 2: j
            // Difference: (sum - j) - j = sum - 2 * j
            return sum - 2 * j;
        }
    }
    
    return 0;
}
