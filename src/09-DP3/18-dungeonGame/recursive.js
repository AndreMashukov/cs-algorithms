// 174. Dungeon Game
// https://leetcode.com/problems/dungeon-game/description/
// Problem Description:
// The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon.
// The dungeon consists of m x n rooms laid out in a 2D grid. Our valiant knight was initially positioned
// in the top-left room and must fight his way through the dungeon to rescue the princess.
//
// The knight has an initial health point represented by a positive integer. 
// If at any point his health
// point drops to 0 or below, he dies immediately.
//
// Some of the rooms are guarded by demons (represented by negative integers), 
// so the knight loses health
// upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that
// increase the knight's health (represented by positive integers).
//
// To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.
//
// Return the knight's minimum initial health so that he can rescue the princess.
//
// Note that any room can contain threats or power-ups, even the first room the knight enters and the
// bottom-right room where the princess is imprisoned.
//
// Example 1:
// Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
// Output: 7
// Explanation: The initial health of the knight must be at least 7 
// if he follows the optimal path: RIGHT -> RIGHT -> DOWN -> DOWN.
//
// Example 2:
// Input: dungeon = [[0]]
// Output: 1
//
// Constraints:
// m == dungeon.length
// n == dungeon[i].length
// 1 <= m, n <= 200
// -1000 <= dungeon[i][j] <= 1000

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
function calculateMinimumHP_dfs(dungeon) {
  // Get the dimensions of the dungeon
  const m = dungeon.length;
  const n = dungeon[0].length;
  
  // Create a memoization map to store already computed results
  // Key format: "row,col" -> minimum health needed from this position
  const memo = new Map();
  
  // Recursive DFS function to find minimum health needed from position (i, j)
  const dfs = (i, j) => {
    // Create a unique key for memoization
    const key = `${i},${j}`;
    
    // If we've already computed this position, return the cached result
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Base case: if we're at the princess's room (bottom-right corner)
    if (i === m - 1 && j === n - 1) {
      // We need at least 1 health after dealing with this room's effect
      // If the room has negative value (demon), we need more initial health
      // If the room has positive value (magic orb), we still need at least 1
      const minHealth = Math.max(1, 1 - dungeon[i][j]);
      memo.set(key, minHealth);
      return minHealth;
    }
    
    // If we're out of bounds, return infinity (invalid path)
    if (i >= m || j >= n) {
      return Infinity;
    }
    
    // Calculate minimum health needed if we go right
    const rightHealth = dfs(i, j + 1);
    
    // Calculate minimum health needed if we go down
    const downHealth = dfs(i + 1, j);
    
    // Choose the path that requires less health
    const minHealthNeeded = Math.min(rightHealth, downHealth);
    
    // Calculate the minimum health needed at current position
    // We need enough health to:
    // 1. Survive this room (if it has damage)
    // 2. Have enough health for the chosen path
    const currentMinHealth = Math.max(1, minHealthNeeded - dungeon[i][j]);
    
    // Cache the result for this position
    memo.set(key, currentMinHealth);
    
    return currentMinHealth;
  };
  
  // Start DFS from the top-left corner (0, 0)
  return dfs(0, 0);
}

// Example Usage:
console.log(calculateMinimumHP_dfs([[-2,-3,3],[-5,-10,1],[10,30,-5]])); // Expected: 7
console.log(calculateMinimumHP_dfs([[0]])); // Expected: 1
console.log(calculateMinimumHP_dfs([[1,2,3],[4,5,6],[7,8,9]])); // Expected: 1
console.log(calculateMinimumHP_dfs([[-3,5]])); // Expected: 4