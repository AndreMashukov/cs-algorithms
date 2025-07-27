# Burst Balloons (DFS with Memoization) - Answers

## Q1: 2
The `1`s are added as virtual boundaries. When you burst a balloon, the coins gained depend on its left and right neighbors. For the original first and last balloons, one neighbor would be out of bounds. By adding `1`s, we ensure that every balloon in the original array always has two neighbors, and these virtual balloons (with value 1) do not affect the multiplication (`x * 1 = x`).

## Q2: 3
The base case `left + 1 === right` signifies that there are no more balloons to burst between the `left` and `right` boundaries. For example, if `left` is 3 and `right` is 4, the loop `for (let i = left + 1; i < right; i++)` will not run, and the function correctly returns 0 coins.

## Q3: 4
The key `${left},${right}` uniquely identifies a subproblem. It represents the task of finding the maximum coins obtainable from bursting all the balloons located strictly between the indices `left` and `right` in the `newNums` array.

## Q4: 3
This expression calculates the coins you get for bursting balloon `i` *after* all other balloons in the range `(left, right)` have already been burst. At this point, the only remaining neighbors for balloon `i` are the boundary balloons at `newNums[left]` and `newNums[right]`.

## Q5: 2
The calls `dfs(left, i)` and `dfs(i, right)` calculate the maximum coins from two new, independent subproblems. `dfs(left, i)` finds the max coins from bursting all balloons between `left` and `i`, and `dfs(i, right)` does the same for balloons between `i` and `right`. This is part of the divide-and-conquer strategy.

## Q6: 2
By deciding which balloon to burst *last*, we create a clear separation. When balloon `i` is the last one to pop in its interval, its neighbors are guaranteed to be `newNums[left]` and `newNums[right]`. This breaks the dependency between the subproblems to its left and right, allowing them to be solved independently. If we chose to burst a balloon *first*, its neighbors would change, affecting all subsequent calculations in a complex way.

## Q7: 1
The function `dfs(left, right)` has roughly n^2 possible states for `(left, right)`. Inside each function call, there is a loop that runs up to `n` times. Because of memoization, each state is computed only once. Therefore, the total time complexity is O(n^2) states * O(n) work per state = O(n^3).

## Q8: 2
The space complexity is determined by the storage for memoization and the depth of the recursion stack. The memoization map can store up to O(n^2) key-value pairs, as there are O(n^2) possible subproblems `(left, right)`. The maximum depth of the recursion stack is O(n). Therefore, the dominant factor is the memoization map, leading to O(n^2) space complexity.

## Q9: 3
This is the core of memoization (or top-down dynamic programming). The `map` stores the results of subproblems that have already been solved. By checking `map.has(key)`, we can immediately return the stored result instead of re-calculating it, which drastically reduces the number of computations from exponential to polynomial time.

## Q10: 2
The initial call `dfs(0, n + 1)` sets the boundaries for the entire problem. It asks the function to find the maximum coins from bursting all the balloons between index 0 and index `n + 1` of `newNums`. These are precisely the balloons from the original `nums` array. The `1`s at `newNums[0]` and `newNums[n+1]` act as the fixed boundaries for the outermost problem.
