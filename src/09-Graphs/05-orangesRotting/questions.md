# Problem: Oranges Rotting (Breadth-First Search)

**Q1: Why is Breadth-First Search (BFS) the most suitable algorithm for the Oranges Rotting problem?**
1. It explores the grid layer by layer, which naturally corresponds to the passing of time in minutes.
2. It is guaranteed to be more memory-efficient than Depth-First Search (DFS) for this type of grid problem.
3. It systematically checks every single cell in the grid from the top-left to the bottom-right.
4. It uses a recursive approach that simplifies the traversal of adjacent cells.

**Q2: What is the primary role of the initial pass through the grid before the main BFS loop begins?**
1. To count the total number of empty cells to determine if a path is possible.
2. To identify the coordinates of all initially rotten oranges and count the number of fresh oranges.
3. To convert all fresh oranges adjacent to rotten ones in the first minute.
4. To build a complete adjacency list for every cell in the grid.

**Q3: Given the grid `[[2, 1, 1], [0, 1, 1], [1, 0, 1]]`, what is the state of the `fresh` orange count and the queue `q` after the first minute of rotting (`time = 1`)?**
1. `fresh` is 3, `q` contains `[[0, 2], [1, 1]]`.
2. `fresh` is 4, `q` contains `[[0, 1]]`.
3. `fresh` is 5, `q` contains `[[0, 0]]`.
4. `fresh` is 3, `q` contains `[[0, 1], [1, 1]]`.

**Q4: Why is the `fresh` orange counter essential for the algorithm's final correctness check?**
1. It is used as the primary condition to terminate the main `while` loop.
2. It helps determine if it was possible to rot all oranges by checking if its final value is zero.
3. It provides the size for the inner `for` loop that processes each level of the BFS.
4. It ensures the queue does not get populated with empty cells.

**Q5: What is the expected output if the input grid contains no fresh oranges to begin with, like `[[2, 0, 2], [0, 0, 2]]`?**
1. -1, because no oranges were rotted.
2. 1, because the process finishes in the first minute.
3. 0, because no time needs to elapse.
4. The total number of rotten oranges.

**Q6: How does the algorithm handle an edge case where a fresh orange is completely surrounded by empty cells, making it impossible to rot?**
1. The `while` loop will run until the time limit is exceeded.
2. The algorithm will return -1 because the `fresh` counter will not reach zero after the queue becomes empty.
3. The algorithm will throw an error when trying to access an out-of-bounds cell.
4. The algorithm will return the total number of fresh oranges that could not be rotted.

**Q7: What is the time complexity of this solution, where `R` is the number of rows and `C` is the number of columns?**
1. O(R * C), because each cell is visited at most a constant number of times.
2. O( (R * C)^2 ), because every cell may need to be checked against every other cell.
3. O(log(R * C)), because the search space is halved at each step.
4. O(fresh), where `fresh` is the initial count of fresh oranges.

**Q8: What determines the worst-case space complexity of this algorithm?**
1. The number of minutes it takes to rot all oranges, as this determines the number of levels in the BFS.
2. The recursion depth of the search, which is proportional to the grid size.
3. The maximum number of oranges that can be in the queue at one time, which in the worst case is O(R * C).
4. The total number of cells in the grid, as a copy of the grid is stored in memory.
