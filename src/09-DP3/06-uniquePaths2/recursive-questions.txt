Problem: Unique Paths II (Recursive Memoization)

Q1: What are the base cases for the recursive solution in uniquePathsWithObstacles?
a) Only when reaching the destination cell
b) Out of bounds, obstacle encountered, or destination reached
c) Only when encountering an obstacle
d) When the grid is empty

Q2: How does the recursive function handle obstacles in the grid?
a) Skip obstacles and continue to next cell
b) Convert obstacles to empty cells
c) Return 0 immediately when obstacle is encountered
d) Store obstacle positions in a separate array

Q3: What do the two recursive calls in each step represent?
a) Moving left and up
b) Moving right and down
c) Moving diagonally
d) Checking all four directions

Q4: How does memoization improve the recursive solution's performance?
a) Reduces space complexity to O(1)
b) Prevents recalculating same subproblems multiple times
c) Eliminates the need for base cases
d) Allows parallel processing of recursive calls

Q5: What key is used for memoization in the recursive solution?
a) Only the row index
b) Only the column index
c) Concatenation of row and column indices
d) The grid cell value

Q6: How is the edge case where starting position has an obstacle handled?
a) Throw an exception
b) Return -1 to indicate error
c) Function naturally returns 0 for obstacle at start
d) Modify the starting position to be empty

Q7: What would happen if memoization was removed from the recursive solution?
a) The solution would become incorrect
b) Space complexity would improve but time complexity would worsen
c) The solution would be faster
d) Base cases would no longer work