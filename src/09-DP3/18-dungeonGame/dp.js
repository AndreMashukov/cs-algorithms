// Problem: Dungeon Game
// LeetCode URL: https://leetcode.com/problems/dungeon-game/description/
// Problem Description:
// The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon.
// The dungeon consists of m x n rooms laid out in a 2D grid. Our valiant knight was initially positioned
// in the top-left room and must fight his way through the dungeon to rescue the princess.
//
// The knight has an initial health point represented by a positive integer. If at any point his health
// point drops to 0 or below, he dies immediately.
//
// Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health
// upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that
// increase the knight's health (represented by positive integers).
//
// To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.
//
// Return the knight's minimum initial health so that he can rescue the princess.
//
// Note that any room can contain threats or power-ups, even the first room the knight enters and the
// bottom-right room where the princess is imprisoned.

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
function calculateMinimumHP_dp(dungeon) {
  // Get the dimensions of the dungeon
  const m = dungeon.length;
  const n = dungeon[0].length;
  
  // Initialize DP table where dp[i][j] represents the minimum health needed
  // to reach the princess starting from position (i, j)
  const dp = Array(m).fill(null).map(() => Array(n).fill(0));
  
  // Base case: Bottom-right corner (princess's room)
  // We need at least 1 health after dealing with this room's effect
  dp[m - 1][n - 1] = Math.max(1, 1 - dungeon[m - 1][n - 1]);
  
  // Fill the last row (can only move right)
  for (let j = n - 2; j >= 0; j--) {
    // To survive current room and have enough health for the next room
    // We need: nextRoomHealth - currentRoomValue
    // But we always need at least 1 health
    dp[m - 1][j] = Math.max(1, dp[m - 1][j + 1] - dungeon[m - 1][j]);
  }
  
  // Fill the last column (can only move down)
  for (let i = m - 2; i >= 0; i--) {
    // To survive current room and have enough health for the room below
    // We need: belowRoomHealth - currentRoomValue
    // But we always need at least 1 health
    dp[i][n - 1] = Math.max(1, dp[i + 1][n - 1] - dungeon[i][n - 1]);
  }
  
  // Fill the rest of the table from bottom-right to top-left
  for (let i = m - 2; i >= 0; i--) {
    for (let j = n - 2; j >= 0; j--) {
      // We can either go right or down from current position
      // Choose the path that requires minimum health
      const minHealthRequired = Math.min(dp[i + 1][j], dp[i][j + 1]);
      
      // Calculate minimum health needed at current position
      // We need enough health to:
      // 1. Survive this room (if it has damage)
      // 2. Have enough health for the chosen path
      dp[i][j] = Math.max(1, minHealthRequired - dungeon[i][j]);
    }
  }
  
  // Return the minimum health needed at the starting position (0, 0)
  return dp[0][0];
}

// Example Usage:
console.log(calculateMinimumHP_dp([[-2,-3,3],[-5,-10,1],[10,30,-5]])); // Expected: 7
console.log(calculateMinimumHP_dp([[0]])); // Expected: 1
console.log(calculateMinimumHP_dp([[1,2,3],[4,5,6],[7,8,9]])); // Expected: 1
console.log(calculateMinimumHP_dp([[-3,5]])); // Expected: 4