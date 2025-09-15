# Find K Closest Elements (Binary Search)

**Problem**: Given a sorted array, target value, and integer k, find k closest elements to target.

## Questions

**Q1**: Why is the right pointer initialized to `arr.length - k` instead of `arr.length - 1`?
1. To prevent the binary search from considering invalid subarrays that extend beyond array bounds
2. To ensure the algorithm runs in O(log n) time complexity
3. To handle cases where k equals the array length
4. To make the binary search converge faster

**Q2**: What is the key insight behind comparing `x - arr[m]` and `arr[m + k] - x`?
1. It determines which half of the current window has elements closer to the target
2. It checks if the middle element is exactly equal to the target
3. It calculates the average distance from target for the entire window
4. It ensures the algorithm handles negative numbers correctly

**Q3**: In the binary search condition `x - arr[m] > arr[m + k] - x`, what does moving `l = m + 1` indicate?
1. The right side of the current window has closer elements to the target
2. The left side of the current window has closer elements to the target  
3. The target is located to the right of the current window
4. The target is located to the left of the current window

**Q4**: What is the time complexity of this algorithm and why?
1. O(log(n-k)) because we perform binary search on possible starting indices
2. O(k log n) because we find k elements using binary search
3. O(n) because we might need to scan the entire array in worst case
4. O(log n) because we use standard binary search

**Q5**: How does this algorithm handle the case where multiple elements have the same distance to target?
1. It naturally preserves the original sorted order when distances are equal
2. It uses a secondary sort by element value when distances are equal
3. It randomly selects among equally distant elements
4. It always prefers smaller elements when distances are equal

**Q6**: What would happen if we initialized `r = arr.length - 1` instead of `arr.length - k`?
1. The algorithm might consider invalid subarrays that extend beyond array bounds
2. The binary search would become infinite
3. The time complexity would increase to O(n)
4. The algorithm would always return the first k elements

**Q7**: In the comparison `x - arr[m] > arr[m + k] - x`, why is this specific inequality used?
1. It ensures we move toward the window with closer elements when the right edge is closer
2. It handles the tie-breaker case where distances are exactly equal
3. It prevents division by zero when x equals array elements
4. It accounts for negative target values correctly

**Q8**: What is the base case for this binary search approach?
1. When `l < r` becomes false, we've found the optimal starting index
2. When `m` equals the target index, we return immediately
3. When k equals 1, we use a different approach
4. When the array contains duplicates of the target value