/*
 * Unique Paths II - Recursive Q&A
 * https://leetcode.com/problems/unique-paths-ii/
 * 
 * Questions and Answers about the Recursive Memoization Approach
 */

/*
Q1: What is the base case for the recursive solution in uniquePathsWithObstacles?
A1: There are several base cases:
    1. If current position is out of bounds (row >= m or col >= n), return 0
    2. If current position has an obstacle (obstacleGrid[row][col] === 1), return 0  
    3. If we've reached the bottom-right corner (row === m-1 && col === n-1), return 1
    These cases ensure we only count valid paths that avoid obstacles and reach the destination.
*/

/*
Q2: How does the recursive function handle obstacles in the grid?
A2: The function checks if the current cell contains an obstacle (value 1) at the beginning:
    if (obstacleGrid[row][col] === 1) return 0;
    This immediately returns 0 paths for any cell with an obstacle, effectively blocking that path.
    The recursion only continues if the current cell is empty (value 0), ensuring we never
    traverse through obstacles.
*/

/*
Q3: What are the two recursive calls made in each step, and what do they represent?
A3: The two recursive calls are:
    1. uniquePathsHelper(row, col + 1, obstacleGrid, memo) - move right
    2. uniquePathsHelper(row + 1, col, obstacleGrid, memo) - move down
    These represent the only two valid moves from any position. The total paths from current
    position equals the sum of paths from moving right plus paths from moving down.
*/

/*
Q4: How does memoization improve the recursive solution's performance?
A4: Memoization stores previously computed results using a key like "row,col":
    const key = `${row},${col}`;
    if (memo.has(key)) return memo.get(key);
    This prevents recalculating the same subproblem multiple times. Without memoization,
    we'd have exponential time complexity O(2^(m+n)). With memoization, it becomes O(m*n).
*/

/*
Q5: What is the time and space complexity of the recursive memoized solution?
A5: Time Complexity: O(m * n) where m and n are grid dimensions
    - Each cell is computed at most once due to memoization
    Space Complexity: O(m * n) for the memoization table + O(m + n) for recursion stack
    - Memo table stores results for up to m*n unique states
    - Maximum recursion depth is m+n (worst case path to bottom-right)
*/

/*
Q6: How do you handle the edge case where the starting position has an obstacle?
A6: The function naturally handles this case because the first call checks:
    if (obstacleGrid[0][0] === 1) return 0;
    If the starting position (top-left) has an obstacle, the function immediately returns 0,
    indicating no paths are possible. This is correct since we can't even begin the journey.
*/

/*
Q7: What would happen if we removed the memoization from the recursive solution?
A7: Without memoization, the solution would still be correct but extremely slow:
    - Time complexity would become O(2^(m+n)) due to overlapping subproblems
    - We'd recalculate the same (row, col) positions many times
    - For larger grids, the solution would timeout due to exponential time complexity
    - The correctness remains the same, but performance becomes impractical for real use.
*/