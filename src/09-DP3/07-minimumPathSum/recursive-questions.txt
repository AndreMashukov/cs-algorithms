Problem: Minimum Path Sum (Recursive Memoization)

Q1: What is the base case for the recursive solution in minPathSum?
a) When reaching any edge of the grid
b) When reaching the bottom-right corner of the grid
c) When encountering a zero value in the grid
d) When the recursion depth exceeds grid size

Q2: How does the recursive function handle boundary conditions?
a) Throws an exception for out-of-bounds access
b) Returns 0 for positions outside the grid
c) Returns Infinity for positions outside the grid
d) Wraps around to the opposite side of the grid

Q3: What do the two recursive calls in each step represent?
a) Moving left and up to find minimum
b) Moving right and down to explore paths
c) Checking all four possible directions
d) Comparing current cell with adjacent cells

Q4: How does memoization optimize the recursive solution?
a) Reduces space complexity to O(1)
b) Stores computed minimum path sums to avoid recalculation
c) Eliminates the need for boundary checking
d) Converts recursion to iteration automatically

Q5: What value is returned when the recursion reaches an out-of-bounds position?
a) 0 (contributes nothing to path sum)
b) Infinity (invalid path that should be ignored)
c) The maximum grid value
d) -1 to indicate error

Q6: How is the minimum path sum calculated at each recursive step?
a) Take maximum of current cell and recursive results
b) Add current cell value to minimum of right and down paths
c) Multiply current cell with recursive results
d) Average the current cell with neighboring cells

Q7: What happens to time complexity when memoization is removed?
a) Improves to O(m*n) due to simpler logic
b) Remains the same at O(m*n)
c) Degrades to O(2^(m+n)) due to overlapping subproblems
d) Becomes O(m+n) with optimized recursion