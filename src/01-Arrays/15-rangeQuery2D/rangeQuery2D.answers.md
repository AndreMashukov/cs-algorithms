## Answers: Range Sum Query 2D - Immutable (2D Prefix Sum)

Q1: What does `dp[r][c]` represent in this implementation (with the extra top row and left column)?
Correct: 3
Explanation: `dp[r][c]` stores the sum over the rectangle from (0,0) to (r-1,c-1) in the original matrix.

Q2: Why is an extra row and column of zeros added to the `dp` array?
Correct: 2
Explanation: Zero-padding with 1-indexing lets us reference `r1-1` and `c1-1` safely and avoid edge-condition branches for top/left boundaries.

Q3: Which inclusion-exclusion formula correctly computes the region sum for 0-indexed `(row1, col1, row2, col2)` after converting to 1-indexed `(r1, c1, r2, c2)`?
Correct: 3
Explanation: Region sum is `dp[r2][c2] - dp[r1-1][c2] - dp[r2][c1-1] + dp[r1-1][c1-1]` per inclusion-exclusion.

Q4: What are the time and space complexities?
Correct: 1
Explanation: Preprocessing touches each cell once to build `dp` (O(RC)), queries are O(1), and `dp` stores O(RC) values.

Q5: Calculation: For matrix
[ [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9] ],
what is `sumRegion(0, 1, 2, 2)`?
Correct: 2
Explanation: Columns 1..2 across all rows: 2+3+5+6+8+9 = 33.

Q6: Which statement best explains why queries that touch the top or left borders do not require special-casing?
Correct: 2
Explanation: The added zero row and column ensure out-of-range top/left references evaluate to 0, so the same formula works everywhere.

Q7: During `dp` construction, the code uses a running `prefix` for each row and adds `above = dp[r-1][c]`. What is the benefit of this design?
Correct: 2
Explanation: Maintaining a row-wise prefix and adding the column-above sum yields the same value as the classic 2D recurrence in constant work per cell.

Q8: Given 0-indexed query inputs `(row1, col1, row2, col2)`, what is the correct conversion to 1-indexed coordinates for the `dp` array?
Correct: 2
Explanation: The `dp` array is 1-indexed with a zero border, so each coordinate is incremented by 1 before applying inclusion-exclusion.