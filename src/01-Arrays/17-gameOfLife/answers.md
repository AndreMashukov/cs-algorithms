# Game of Life: Answers

Q1: In the Game of Life algorithm, what is the primary purpose of using state transitions like `0 -> 2` (dead to live) and `1 -> 3` (live to live)?
2. To store the next state of the board in-place without using extra memory for a new board.
Explanation: The algorithm uses the second bit to store the next state. This allows the original state (first bit) to be read for neighbor calculations while encoding the future state in the same cell, achieving an O(1) space solution.

Q2: Consider a 3x3 board where all cells are live (1). What will be the state of the center cell in the next generation?
1. It will become a dead cell because it has eight live neighbors, which is more than three.
Explanation: According to the rules, a live cell with more than three live neighbors dies due to over-population. The center cell has eight neighbors, so it will die.

Q3: What is the time complexity of the provided Game of Life algorithm for an `m x n` board?
1. O(m * n * 8), which simplifies to O(m * n), as each cell is visited a constant number of times.
Explanation: The algorithm iterates through each of the `m * n` cells twice. For each cell, it checks its 8 neighbors. Since the work per cell is constant, the total time complexity is proportional to the number of cells.

Q4: Why does the `countLiveNeighbors` function subtract 1 from the count if the cell at `(r, c)` is live (i.e., `board[r][c] === 1 || board[r][c] === 3`)?
1. To account for the fact that the loop iterates over a 3x3 grid that includes the cell itself.
Explanation: The nested loops for counting neighbors iterate over a 3x3 grid centered at `(r, c)`, which includes the cell itself. The correction is needed to ensure a cell is not counted as its own neighbor.

Q5: If a dead cell has exactly three live neighbors, what will its new state be after the first pass of the algorithm?
2. It will be marked as 2, indicating it was dead but will become live.
Explanation: The state `2` (binary `10`) is used to signify that a cell was originally dead (0) but will become live (1) in the next generation. This intermediate state preserves the original state for subsequent neighbor calculations.

Q6: What is the space complexity of this in-place Game of Life implementation?
3. O(1) because the board is modified in-place, using no extra space proportional to the input size.
Explanation: The algorithm cleverly uses bit manipulation to store both the current and next state within the board itself. No auxiliary data structures that scale with the board size are needed.

Q7: How does the algorithm handle cells at the edges and corners of the board?
2. It checks if a neighbor is within the valid `(0, 0)` to `(ROWS-1, COLS-1)` bounds before counting it.
Explanation: The `if (i >= 0 && i < ROWS && j >= 0 && j < COLS)` condition ensures that the neighbor count only includes cells that are actually on the board, correctly handling boundaries.

Q8: In the second pass of the algorithm, why are cells with state 3 updated to 1, while cells with state 1 are updated to 0?
1. State 3 means the cell was live and remains live, while state 1 means it was live but dies.
Explanation: State `3` (binary `11`) means the cell was live and will stay live. State `1` (binary `01`) on its own means the cell was live but did not meet the criteria to survive, so it dies (becomes 0).