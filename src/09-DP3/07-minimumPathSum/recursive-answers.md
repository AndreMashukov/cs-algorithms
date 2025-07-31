Problem: Minimum Path Sum (Recursive Memoization)

A1: b) When reaching the bottom-right corner of the grid
Explanation: The base case occurs when row === m-1 && col === n-1, returning grid[row][col] since we've found a complete path to the destination.

A2: c) Returns Infinity for positions outside the grid
Explanation: When row >= m || col >= n, the function returns Infinity to indicate an invalid path that should not be considered in minimum calculations.

A3: b) Moving right and down to explore paths
Explanation: The recursive calls are minPathSumHelper(row, col + 1) for right movement and minPathSumHelper(row + 1, col) for down movement, representing valid moves.

A4: b) Stores computed minimum path sums to avoid recalculation
Explanation: Memoization uses "row,col" keys to store results, preventing recalculation of the same subproblems and reducing time complexity from exponential to O(m*n).

A5: b) Infinity (invalid path that should be ignored)
Explanation: Returning Infinity ensures out-of-bounds paths are never selected as minimum, since any valid finite path sum will be less than Infinity.

A6: b) Add current cell value to minimum of right and down paths
Explanation: The calculation is grid[row][col] + Math.min(rightPath, downPath), ensuring we choose the path that leads to minimum total sum.

A7: c) Degrades to O(2^(m+n)) due to overlapping subproblems
Explanation: Without memoization, the same positions are recalculated multiple times, leading to exponential time complexity due to the recursive branching factor.