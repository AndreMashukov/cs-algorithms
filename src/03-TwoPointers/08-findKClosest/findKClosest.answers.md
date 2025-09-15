# Find K Closest Elements - Answers

## Q1: Why is the right pointer initialized to `arr.length - k` instead of `arr.length - 1`?
**Answer: 1**
The right pointer is initialized to `arr.length - k` to ensure the binary search only considers valid starting indices for subarrays of length k, preventing consideration of windows that would extend beyond the array bounds.

## Q2: What is the key insight behind comparing `x - arr[m]` and `arr[m + k] - x`?
**Answer: 2**  
This comparison checks if the left edge of the window is farther from target than the right edge, indicating whether to move the window right or left to find closer elements.

## Q3: In the binary search condition `x - arr[m] > arr[m + k] - x`, what does moving `l = m + 1` indicate?
**Answer: 1**
Moving `l = m + 1` indicates that the right side of the current window has closer elements to the target, so we eliminate the left half and search in the right portion.

## Q4: What is the time complexity of this algorithm and why?
**Answer: 3**
The time complexity is O(log(n-k)) because the binary search operates on a search space of size n-k, reducing the problem size by half each iteration.

## Q5: How does this algorithm handle the case where multiple elements have the same distance to target?
**Answer: 4**
The algorithm preserves the original order and when distances are equal, it naturally returns elements in sorted ascending order as they appear in the input array.

## Q6: What would happen if we initialized `r = arr.length - 1` instead of `arr.length - k`?
**Answer: 1**
Initializing `r = arr.length - 1` would allow the algorithm to consider invalid subarrays that extend beyond array bounds when `m + k` exceeds the array length.

## Q7: In the comparison `x - arr[m] > arr[m + k] - x`, why is this specific inequality used?
**Answer: 2**
This specific inequality serves as a tie-breaker - when distances are equal, it ensures we move the window in the correct direction to maintain the closest elements.

## Q8: What is the base case for this binary search approach?
**Answer: 1**
The base case is when `l < r` becomes false, indicating we've converged to the optimal starting index for the k-length subarray closest to the target.