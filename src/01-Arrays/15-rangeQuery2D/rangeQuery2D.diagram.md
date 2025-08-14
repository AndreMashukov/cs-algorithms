# Range Sum Query 2D - Immutable: Visual Explanation

This document provides a visual walkthrough of the `NumMatrix` class, which calculates the sum of elements within a 2D rectangle in O(1) time using a precomputed sum table (dynamic programming).

## 1. Core Concept: The DP Sum Table

The key idea is to create a DP table, `dp`, where `dp[r][c]` stores the sum of all elements in the rectangle from `(0,0)` to `(r-1, c-1)` in the original `matrix`.

### DP Table Construction

The `dp` table is one size larger than the input `matrix` to simplify boundary calculations. The value of each cell is calculated as:

`dp[r][c] = matrix[r-1][c-1] + dp[r-1][c] + dp[r][c-1] - dp[r-1][c-1]`

Alternatively, as implemented in the code, we can use a running row prefix sum:

`dp[r][c] = (row_prefix_sum) + dp[r-1][c]`

**Example:**

Given `matrix`:
```
1  2  3
4  5  6
7  8  9
```

The resulting `dp` table would be:
```
      c=0  c=1  c=2  c=3
    +-------------------+
r=0 | 0  |  0 |  0 |  0 |
    +-------------------+
r=1 | 0  |  1 |  3 |  6 |  (1, 1+2, 1+2+3)
    +-------------------+
r=2 | 0  |  5 | 12 | 21 |  (1+4, 3+5+4, 6+6+5+4)
    +-------------------+
r=3 | 0  | 12 | 27 | 45 |
    +-------------------+
```
*   `dp[1][1] = 1`
*   `dp[2][2] = matrix[0][0] + ... + matrix[1][1] = 1+2+4+5 = 12`
*   `dp[3][3] = sum of all elements = 45`

## 2. `sumRegion` Calculation: Inclusion-Exclusion Principle

To calculate the sum of a region defined by `(r1, c1)` and `(r2, c2)`, we use the `dp` table and the inclusion-exclusion principle.

**Visual Formula:**

Let the desired region be `S`.
Let `A, B, C, D` be the sum rectangles from `(0,0)` stored in our `dp` table.

```
      c1   c2
    +----+----+
 r1 | A  | B  |
    +----+----+
 r2 | C  | D  |
    +----+----+

S = D - B - C + A
```

Where:
*   `D = dp[r2+1][c2+1]` (Sum of the large rectangle from origin)
*   `B = dp[r1][c2+1]` (Sum of the rectangle above the target region)
*   `C = dp[r2+1][c1]` (Sum of the rectangle to the left of the target region)
*   `A = dp[r1][c1]` (Sum of the top-left rectangle, which was subtracted twice)

### Diagram of the `sumRegion` Logic

Let's find `sumRegion(r1, c1, r2, c2)`.

```
      (c1)         (c2)
       .            .
       .            .
(r1) . +------------+
       | A          | B
       |    +-------|------+
       |    |       |      |
       |----+-------+      |
       | C  |   S   |      |
       |    |       |      |
(r2) . +----+-------+      |
       |            D      |
       +-------------------+

```

1.  **`bottomRight = D`**: The sum of the entire rectangle from `(0,0)` to `(r2, c2)`. This includes our target region `S` plus `A`, `B`, and `C`.
2.  **`above = B`**: We subtract the sum of the rectangle from `(0,0)` to `(r1-1, c2)`. This removes the area above `S`.
3.  **`left = C`**: We subtract the sum of the rectangle from `(0,0)` to `(r2, c1-1)`. This removes the area to the left of `S`.
4.  **`topLeft = A`**: The top-left corner rectangle `A` was part of both `B` and `C`, so it was subtracted twice. We must add it back once.

**Final calculation:** `sum = D - B - C + A`

## 3. Step-by-Step Example

**Input:**
`matrix = [[1, 2], [3, 4]]`
`sumRegion(0, 0, 1, 1)`

**1. DP Table Construction:**

`dp` table is `3x3`:
```
   c=0 c=1 c=2
r=0 [0,  0,  0],
r=1 [0,  1,  3],  // 1, 1+2
r=2 [0,  4, 10]   // 1+3, 3+4+3
```

**2. `sumRegion(0, 0, 1, 1)` Execution:**

*   `row1=0, col1=0, row2=1, col2=1`
*   Convert to 1-based indices for `dp` table:
    *   `r1=1, c1=1, r2=2, c2=2`

*   **Fetch values from `dp` table:**
    *   `bottomRight = dp[r2][c2] = dp[2][2] = 10`
    *   `above = dp[r1-1][c2] = dp[0][2] = 0`
    *   `left = dp[r2][c1-1] = dp[2][0] = 0`
    *   `topLeft = dp[r1-1][c1-1] = dp[0][0] = 0`

*   **Calculate Final Sum:**
    *   `sum = 10 - 0 - 0 + 0 = 10`

This matches the sum of all elements in the matrix: `1 + 2 + 3 + 4 = 10`.
