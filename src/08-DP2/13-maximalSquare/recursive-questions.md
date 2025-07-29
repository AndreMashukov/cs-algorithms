# Maximal Square (DFS with Memoization) - Questions

### Q1: What is the first operation performed inside the `helper` function for a given `(r, c)`?
1. It checks if `matrix[r][c]` is '1'.
2. It makes a recursive call for `helper(r, c + 1)`.
3. It checks if the result for `(r, c)` is already in the memoization map.
4. It checks if `r` or `c` are out of the matrix bounds.

### Q2: When `helper(r, c)` is called, what do the recursive calls `helper(r, c + 1)`, `helper(r + 1, c)`, and `helper(r + 1, c + 1)` represent in the context of the problem?
1. They are checking the three adjacent cells to see if they are '1's.
2. They are calculating the size of the largest squares that can start from the cell to the right, the cell below, and the cell diagonally down-right.
3. They are exploring different paths in a maze to find the exit.
4. They are part of a standard matrix traversal and don't have a specific meaning to this problem.

### Q3: If `matrix[r][c]` is '1', the value stored in the map is `Math.min(right, down, diagonal) + 1`. What does the `+ 1` signify?
1. It's an off-by-one correction factor for the recursive calls.
2. It accounts for the current cell `(r, c)` itself, which is part of the square.
3. It ensures the stored value is always positive.
4. It's a counter for the recursion depth.

### Q4: What is the direct return value of `helper(r, c)`?
1. The area of the largest square starting at `(r, c)`.
2. The side length of the largest square starting at `(r, c)`.
3. A boolean indicating if a square can be formed at `(r, c)`.
4. The value of `matrix[r][c]`.

### Q5: The initial implementation calls `helper(0, 0)` and then processes the map. Why is the commented-out loop (`for (let r = 0; r < ROWS; r++) ...`) a more correct approach to drive the algorithm?
1. The loop is more efficient because it avoids deep recursion.
2. The largest square in the matrix might not have its top-left corner at `(0, 0)`. The loop ensures every cell is considered as a potential starting point.
3. The single call to `helper(0, 0)` doesn't populate the memoization map correctly.
4. The loop is necessary to handle non-square matrices.

### Q6: What is the base case for the recursion in the `helper` function?
1. When `matrix[r][c]` is '0'.
2. When the function tries to access an index outside the matrix bounds.
3. When the memoization map contains the key for the current `(r, c)`.
4. When a square of size 1 is found.

### Q7: If the line `map.set(key, 0)` for when `matrix[r][c]` is '0' were removed, what would be the most likely negative consequence?
1. The function would enter an infinite recursion.
2. The final area calculation would be slightly off.
3. The function would still work correctly, but might be slower.
4. Dependent calculations would fail because `Math.min` would receive `undefined`, resulting in `NaN`.

### Q8: What is the purpose of the `key` variable, created as `${r}-${c}`?
1. To store the coordinates in a human-readable format for debugging.
2. To create a unique identifier for each cell `(r, c)` to be used as a key in the memoization map.
3. To perform arithmetic operations on the coordinates.
4. To encrypt the coordinates for security.
