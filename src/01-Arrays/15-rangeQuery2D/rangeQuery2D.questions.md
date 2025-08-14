## Problem: Range Sum Query 2D - Immutable (2D Prefix Sum) (Arrays)

Q1: What does `dp[r][c]` represent in this implementation (with the extra top row and left column)?
1. The sum of elements in row r-1 only, from column 0 to c-1
2. The sum of elements in column c-1 only, from row 0 to r-1
3. The sum of all elements in the submatrix from (0,0) to (r-1, c-1), inclusive
4. The value of the original matrix at (r, c)

Q2: Why is an extra row and column of zeros added to the `dp` array?
1. To reduce memory usage by reusing the first row and column
2. To simplify O(1) queries by avoiding bounds checks for top/left edges via zero-padding and 1-indexing
3. To ensure the matrix can be updated in O(1) per cell
4. To allow diagonal sums to be computed without additional variables

Q3: Which inclusion-exclusion formula correctly computes the region sum for 0-indexed `(row1, col1, row2, col2)` after converting to 1-indexed `(r1, c1, r2, c2)`?
1. `dp[r2][c2] + dp[r1][c1] - dp[r2][c1] - dp[r1][c2]`
2. `dp[r2][c2] - dp[r1][c2] - dp[r2][c1] + dp[r1][c1]`
3. `dp[r2][c2] - dp[r1-1][c2] - dp[r2][c1-1] + dp[r1-1][c1-1]`
4. `dp[r2-1][c2-1] - dp[r1][c2-1] - dp[r2-1][c1] + dp[r1][c1]`

Q4: What are the time and space complexities?
1. Preprocessing O(RC), Query O(1), Space O(RC)
2. Preprocessing O(RC log RC), Query O(log RC), Space O(R + C)
3. Preprocessing O(R + C), Query O(1), Space O(R + C)
4. Preprocessing O(RC), Query O(R + C), Space O(RC)

Q5: Calculation: For matrix
[ [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9] ],
what is `sumRegion(0, 1, 2, 2)`?
1. 30
2. 33
3. 24
4. 27

Q6: Which statement best explains why queries that touch the top or left borders do not require special-casing?
1. The constructor sorts each row to make border handling trivial
2. The extra zero-padded row/column ensures `dp[r1-1][*]` or `dp[*][c1-1]` exist and evaluate to 0
3. The algorithm clamps indices to valid ranges at query time
4. The algorithm ignores any part of a query that lies on the top or left border

Q7: During `dp` construction, the code uses a running `prefix` for each row and adds `above = dp[r-1][c]`. What is the benefit of this design?
1. It avoids storing the `dp` array entirely
2. It reduces per-cell computation to O(1) while being algebraically equivalent to the classic 2D formula `mat + dp[r-1][c] + dp[r][c-1] - dp[r-1][c-1]`
3. It enables handling negative numbers without extra checks
4. It allows queries to be processed before preprocessing finishes

Q8: Given 0-indexed query inputs `(row1, col1, row2, col2)`, what is the correct conversion to 1-indexed coordinates for the `dp` array?
1. `(r1, c1, r2, c2) = (row1, col1, row2, col2)`
2. `(r1, c1, r2, c2) = (row1 + 1, col1 + 1, row2 + 1, col2 + 1)`
3. `(r1, c1, r2, c2) = (row1, col1 + 1, row2, col2 + 1)`
4. `(r1, c1, r2, c2) = (row1 + 1, col1, row2 + 1, col2)`