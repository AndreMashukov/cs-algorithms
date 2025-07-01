// https://leetcode.com/problems/minimum-cost-for-tickets/

/**
 * Calculate the minimum cost of tickets required to travel on all specified days
 * using bottom-up dynamic programming
 * 
 * @param {number[]} days - The days on which we need to travel
 * @param {number[]} costs - The costs of 1-day, 7-day, and 30-day passes
 * @return {number} - The minimum cost to cover all travel days
 */
const minCostTickets = (days, costs) => {
    // Create DP array to store minimum cost up to each day
    const dp = new Array(days[days.length - 1] + 1).fill(0);
    
    // Create a set of travel days for O(1) lookup
    const travelDays = new Set(days);
    
    // For each day up to the last travel day
    for (let day = 1; day <= days[days.length - 1]; day++) {
        // If it's not a travel day, cost remains same as previous day
        if (!travelDays.has(day)) {
            dp[day] = dp[day - 1];
            continue;
        }
        
        // Consider all three pass options and take minimum
        // 1-day pass
        let oneDay = dp[day - 1] + costs[0];
        
        // 7-day pass
        let sevenDay = dp[Math.max(0, day - 7)] + costs[1];
        
        // 30-day pass
        let thirtyDay = dp[Math.max(0, day - 30)] + costs[2];
        
        // Take minimum of all three options
        dp[day] = Math.min(oneDay, sevenDay, thirtyDay);
    }
    
    // Return minimum cost for all days
    return dp[days[days.length - 1]];
};

// Example usage
console.log(minCostTickets([1,4,6,7,8,20], [2,7,15])); // Output: 11
console.log(minCostTickets([1,2,3,4,5,6,7,8,9,10,30,31], [2,7,15])); // Output: 17

/*
Explanation of the DP approach:

1. We create a DP array where dp[i] represents the minimum cost to cover all
   travel days up to day i.

2. For each day:
   - If it's not a travel day, the cost remains the same as the previous day
   - If it's a travel day, we consider three options:
     a) Buy a 1-day pass for today
     b) Buy a 7-day pass covering up to 7 days before
     c) Buy a 30-day pass covering up to 30 days before
     We take the minimum of these three options

3. The final answer is in dp[lastDay] where lastDay is the last day of travel

Time Complexity: O(n) where n is the last day of travel
Space Complexity: O(n) for the DP array
*/
