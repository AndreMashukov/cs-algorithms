# Maximal Square (DFS with Memoization) - Answers

### Q1: 4
**Explanation:** The very first check in the `helper` function is `if (r >= ROWS || c >= COLS) return 0;`, which handles the base case of going out of bounds before any other logic is executed.

### Q2: 2
**Explanation:** These recursive calls are the essence of the dynamic programming solution. They solve the subproblems for the neighboring cells, and their results are used to determine the solution for the current cell `(r, c)`.

### Q3: 2
**Explanation:** The `Math.min` part determines the size of the largest square that can be "attached" to the current cell from its neighbors. The `+ 1` is added to include the current cell `(r, c)` itself, thereby extending that smaller square by one row and one column.

### Q4: 2
**Explanation:** The `helper` function is specifically designed to compute and return the **side length** of the largest square that can have its top-left corner at `(r, c)`. The final area is calculated outside of this function by squaring the side length.

### Q5: 2
**Explanation:** A single call to `helper(0, 0)` only finds the largest square that can start at the matrix's origin. The problem requires finding the largest square **anywhere** in the matrix, so every cell must be tested as a potential top-left corner.

### Q6: 2
**Explanation:** The recursion must stop when it attempts to access an index outside the matrix's defined `ROWS` or `COLS`. At this point, it's impossible to form a square, so it correctly returns `0`.

### Q7: 4
**Explanation:** If a '0' cell is encountered and nothing is stored, a later recursive call for a '1' cell might depend on this '0' cell's result. The `helper` would return `undefined` for the '0' cell, and `Math.min(..., undefined, ...)` results in `NaN`, which corrupts all subsequent calculations that depend on it.

### Q8: 2
**Explanation:** The `Map` data structure requires a unique key for each entry. The template literal `${r}-${c}` provides a simple and effective way to convert the two integer coordinates into a single, unique string key, ensuring that each cell's result is stored and retrieved correctly.
