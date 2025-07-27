# Burst Balloons (DFS with Memoization) - Questions

## Q1: What is the primary purpose of creating `newNums` by adding `1` to both ends of the original `nums` array?
1. To increase the total number of balloons by two.
2. To handle the calculation for bursting the first and last original balloons, as their neighbors would otherwise be out of bounds.
3. To make the array 1-indexed for easier calculations.
4. To simplify the base case of the recursion.

## Q2: What is the base case for the `dfs(left, right)` recursive function?
1. `left > right`
2. `left === right`
3. `left + 1 === right`
4. `left === 0 && right === n + 1`

## Q3: In the `dfs` function, what does the memoization key `const key = `${left},${right}`;` represent?
1. The indices of the single balloon being burst.
2. The result of the subproblem for the subarray from `left` to `right`.
3. A unique identifier for the depth of the recursion.
4. The range of balloons (between index `left` and `right` exclusively) that are yet to be burst.

## Q4: What does the expression `newNums[left] * newNums[i] * newNums[right]` calculate?
1. The coins gained from bursting the `i`-th balloon at the current step.
2. The total coins for the subproblem defined by `left` and `right`.
3. The coins gained from bursting the `i`-th balloon, assuming it is the *last* balloon to be burst in the range `(left, right)`.
4. The maximum possible coins that can be obtained from the `i`-th balloon.

## Q5: What do the recursive calls `dfs(left, i)` and `dfs(i, right)` represent?
1. The coins obtained from bursting all balloons to the left and right of balloon `i`, respectively, *before* bursting `i`.
2. The maximum coins from the subproblems of bursting balloons in the ranges `(left, i)` and `(i, right)`.
3. The next two balloons to burst after `i`.
4. A way to divide the problem into two independent halves.

## Q6: The core logic iterates through `i` from `left + 1` to `right - 1` to decide which balloon to burst last in the `(left, right)` interval. Why is this "burst last" strategy effective?
1. It's the only way to ensure all balloons are burst.
2. It simplifies the calculation by making the neighbors of the last-burst balloon (`newNums[left]` and `newNums[right]`) fixed and known.
3. It reduces the number of recursive calls needed.
4. It guarantees the maximum coins are always found at the first `i`.

## Q7: What is the time complexity of the `maxCoinsDfs` solution with memoization?
1. O(n^3), where n is the number of balloons.
2. O(n^2), where n is the number of balloons.
3. O(2^n), where n is the number of balloons.
4. O(n * log n), where n is the number of balloons.

## Q8: What is the space complexity of the `maxCoinsDfs` solution?
1. O(n), for the recursion stack.
2. O(n^2), for the memoization map and recursion stack.
3. O(1), as it's all done in place.
4. O(n^3), for the memoization map.

## Q9: What is the purpose of the `map.has(key)` check at the beginning of the `dfs` function?
1. To ensure the key is valid before using it.
2. To prevent infinite recursion.
3. To avoid re-computing the result for a subproblem that has already been solved.
4. To check if there are any balloons left to burst in the range.

## Q10: What does the initial call `dfs(0, n + 1)` signify?
1. It starts the process by trying to burst the 0th balloon.
2. It defines the initial subproblem as the entire range of `newNums`, with the boundary `1`s at indices 0 and n+1.
3. It's a convention to start from 0 and go to the end of the array.
4. It calculates the coins for the first and last balloon first.
