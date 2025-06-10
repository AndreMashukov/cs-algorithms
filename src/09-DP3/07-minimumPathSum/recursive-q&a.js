/*
 * Minimum Path Sum - Recursive Q&A
 * https://leetcode.com/problems/minimum-path-sum/
 * 
 * Questions and Answers about the Recursive Memoization Approach
 */

/*
Q1: What is the base case for the recursive solution in minPathSum?
A1: The base case occurs when we reach the bottom-right corner of the grid:
    if (row === m - 1 && col === n - 1) return grid[row][col];
    This means we've found a complete path, so we return the value of the destination cell.
    Any position outside the grid bounds is handled by returning Infinity to indicate 
    an invalid path that should not be considered in the minimum calculation.
*/

/*
Q2: How does the recursive function handle boundary conditions?
A2: Boundary conditions are handled by checking if the current position is out of bounds:
    if (row >= m || col >= n) return Infinity;
    This ensures we never access array elements outside the grid. Returning Infinity
    prevents these invalid paths from being selected as the minimum, since any valid
    path will have a finite sum that's less than Infinity.
*/

/*
Q3: What are the two recursive calls made in each step, and what do they represent?
A3: The two recursive calls are:
    1. minPathSumHelper(row, col + 1, grid, memo) - move right
    2. minPathSumHelper(row + 1, col, grid, memo) - move down
    These represent the only two valid moves from any position. The minimum path sum
    from the current position equals the current cell value plus the minimum of the
    two possible next steps.
*/

/*
Q4: How does memoization optimize the recursive solution?
A4: Memoization stores previously computed minimum path sums using a key like "row,col":
    const key = `${row},${col}`;
    if (memo.has(key)) return memo.get(key);
    This prevents recalculating the minimum path sum for the same position multiple times.
    Without memoization, we'd have exponential time complexity O(2^(m+n)). With memoization,
    it becomes O(m*n) since each cell is computed at most once.
*/

/*
Q5: How do you calculate the minimum path sum at each recursive step?
A5: At each step, calculate the minimum of moving right or down, then add the current cell value:
    const rightPath = minPathSumHelper(row, col + 1, grid, memo);
    const downPath = minPathSumHelper(row + 1, col, grid, memo);
    const result = grid[row][col] + Math.min(rightPath, downPath);
    
    This ensures we always choose the path that leads to the minimum total sum.
    The current cell's value is always included since we must pass through it.
*/

/*
Q6: What is the time and space complexity of the recursive memoized solution?
A6: Time Complexity: O(m * n) where m and n are grid dimensions
    - Each cell is computed at most once due to memoization
    - Total unique subproblems equals the number of cells in the grid
    
    Space Complexity: O(m * n) for memoization table + O(m + n) for recursion stack
    - Memo table stores results for up to m*n unique (row, col) pairs
    - Maximum recursion depth is m+n-1 (length of path from top-left to bottom-right)
*/

/*
Q7: How would the solution behave without memoization?
A7: Without memoization, the solution would still be correct but extremely inefficient:
    - Time complexity would become O(2^(m+n)) due to overlapping subproblems
    - The same (row, col) positions would be recalculated many times
    - For larger grids, the solution would timeout due to exponential branching
    - Each path from top-left to bottom-right would be explored completely multiple times
    - Memory usage would only be O(m+n) for the recursion stack, but runtime would be impractical
*/