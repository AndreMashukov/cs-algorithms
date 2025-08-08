# Problem: Surrounded Regions (Graphs / DFS)

Q1: Which cells are flipped from 'O' to 'X' by the algorithm?
1. All cells containing 'O'
2. Only 'O' cells that are not connected (four-directionally) to any border 'O'
3. Only 'O' cells that touch an 'X' horizontally or vertically
4. Only interior 'O' cells that are part of a region of size ≥ 2

Q2: What is the correct base case for the DFS capture function used to mark safe cells?
1. Stop if the cell is in-bounds and equals 'O'
2. Stop if the cell is out of bounds, or the cell is not 'O' (e.g., it's 'X' or already marked)
3. Stop only if the cell is 'X'
4. Stop if the cell is 'O' and on the border

Q3: Why does the algorithm start DFS/BFS from the border cells instead of from interior cells?
1. To minimize time complexity from O(RC) to O(R + C)
2. To identify all 'O's that can reach the border and therefore must not be flipped
3. Because DFS can only begin at border cells in grid problems
4. To guarantee tail-call optimization in recursive implementations

Q4: What are the time and space complexities of the algorithm (with recursive DFS)? Let R = #rows, C = #cols.
1. Time O(R + C), Space O(1)
2. Time O(RC), Space O(1) extra (but O(RC) worst-case call stack/queue)
3. Time O(RC), Space O(RC) in the worst case due to recursion/queue
4. Time O(RC log(RC)), Space O(log(RC))

Q5: How does the algorithm treat diagonal connections between 'O' cells?
1. Diagonal connections are treated as connected; such regions are preserved
2. Diagonal connections are ignored; only four-directional connections matter
3. Diagonal connections are considered only if at least one 'O' is on the border
4. Diagonal connections are used only during the final flipping pass

Q6: After running the algorithm, how many 'O's remain in the following board?
```
X X X X
X O O X
X X X X
```
1. 0
2. 1
3. 2
4. 3

Q7: If you replace recursive DFS with iterative BFS using a queue to mark border-connected 'O's, what changes?
1. The set of preserved cells may differ
2. The algorithm’s correctness changes; BFS does not work here
3. Asymptotic time remains O(RC); space is still O(RC) in the worst case, but recursion depth issues are avoided
4. Time becomes O((RC)^2) due to queue operations

Q8: Suppose you forget to mark visited 'O' cells (e.g., by writing 'T') during traversal. What is the most likely outcome?
1. The traversal still terminates after visiting each 'O' exactly once
2. The traversal repeatedly revisits the same 'O's through different paths, leading to non-termination or excessive recursion
3. Only border 'O's are affected; interior 'O's are safe
4. The final flipping pass compensates, so correctness is unchanged
