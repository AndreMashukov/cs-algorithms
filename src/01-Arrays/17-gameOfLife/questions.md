Problem: Game of Life (In-place modification)

Q1: In the Game of Life algorithm, what is the primary purpose of using state transitions like `0 -> 2` (dead to live) and `1 -> 3` (live to live)?
1. To reduce the number of iterations required to update the board to its next state.
2. To store the next state of the board in-place without using extra memory for a new board.
3. To simplify the process of counting live neighbors for each cell in the grid.
4. To make the algorithm compatible with different grid sizes and dimensions.

Q2: Consider a 3x3 board where all cells are live (1). What will be the state of the center cell in the next generation?
1. It will become a dead cell because it has eight live neighbors, which is more than three.
2. It will remain a live cell because it is surrounded by other live cells.
3. It will become a dead cell due to under-population from having too few neighbors.
4. Its state will not change because it is in the exact center of the board.

Q3: What is the time complexity of the provided Game of Life algorithm for an `m x n` board?
1. O(m * n * 8), which simplifies to O(m * n), as each cell is visited a constant number of times.
2. O(m + n), because the algorithm only needs to iterate through rows and columns once.
3. O((m * n)^2), because for each cell, we might have to check all other cells.
4. O(1), as the number of rules applied to each cell is constant regardless of board size.

Q4: Why does the `countLiveNeighbors` function subtract 1 from the count if the cell at `(r, c)` is live (i.e., `board[r][c] === 1 || board[r][c] === 3`)?
1. To account for the fact that the loop iterates over a 3x3 grid that includes the cell itself.
2. To simplify the boundary checks for cells located at the edges of the board.
3. To ensure that dead cells are not accidentally counted as live neighbors.
4. To handle the special case where a cell has no live neighbors at all.

Q5: If a dead cell has exactly three live neighbors, what will its new state be after the first pass of the algorithm?
1. It will be marked as 1, immediately changing its state to live.
2. It will be marked as 2, indicating it was dead but will become live.
3. It will remain 0, as the board is not updated until the second pass.
4. It will be marked as 3, indicating it was live and will remain live.

Q6: What is the space complexity of this in-place Game of Life implementation?
1. O(m * n) because a copy of the board is created to store the next state.
2. O(m + n) to store intermediate results for each row and column.
3. O(1) because the board is modified in-place, using no extra space proportional to the input size.
4. O(log(m * n)) due to the recursive calls in the neighbor counting function.

Q7: How does the algorithm handle cells at the edges and corners of the board?
1. It wraps around the board, treating the grid as a torus where edges connect.
2. It checks if a neighbor is within the valid `(0, 0)` to `(ROWS-1, COLS-1)` bounds before counting it.
3. It ignores all cells on the border, leaving them in their original state.
4. It assigns a default value of 0 for any neighbor that is outside the grid boundaries.

Q8: In the second pass of the algorithm, why are cells with state 3 updated to 1, while cells with state 1 are updated to 0?
1. State 3 means the cell was live and remains live, while state 1 means it was live but dies.
2. This is a way to swap the states of cells to create a different pattern on the board.
3. State 3 indicates an error that needs to be corrected to 1, while state 1 is a stable state.
4. The second pass is designed to reverse the changes made in the first pass for debugging.