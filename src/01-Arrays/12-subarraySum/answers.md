Answers:

Q1: What is the primary purpose of the `Map` data structure in the `subarraySum` algorithm?
3. To store cumulative sums and their frequencies for efficient counting.
Explanation: The map stores prefix sums as keys and their frequencies as values, allowing the algorithm to quickly find how many times a `sum - k` has occurred.

Q2: Why is the map initialized with `map.set(0, 1)` before the loop begins?
2. To correctly count subarrays that start from the beginning of the array (index 0).
Explanation: Initializing the map with `{0: 1}` accounts for subarrays whose sum equals `k` and start from index 0, as their prefix sum `sum` would be exactly `k`.

Q3: In the `subarraySum` algorithm, what does `map.has(sum - k)` check for?
4. It looks for a prior cumulative sum that, when removed from the current `sum`, results in `k`.
Explanation: If `current_sum - previous_sum = k`, then `previous_sum = current_sum - k`. The check `map.has(sum - k)` finds if such a `previous_sum` exists.

Q4: Given `nums = [1, 1, 1]` and `k = 2`, what is the value of `count` after the second iteration (i.e., after processing `nums[1]`)?
2. 1
Explanation: After the first iteration, `sum` is 1. After the second, `sum` is 2. The code finds `map.has(2 - 2 = 0)`, which is true, so `count` becomes 1.

Q5: How would the algorithm behave if the input array `nums` contains only negative numbers, for example, `nums = [-1, -2, -3]` and `k = -3`?
2. It will correctly identify the two subarrays `[-1, -2]` and `[-3]`.
Explanation: The logic of using a prefix sum map works identically for negative numbers. It will find the subarray `[-3]` and the subarray `[-1, -2]` which sums to -3.

Q6: What is the primary reason for updating the map with `map.set(sum, (map.get(sum) || 0) + 1)` inside the loop?
2. To keep track of how many times each cumulative sum has occurred.
Explanation: Storing frequencies is crucial because multiple distinct subarrays can have the same cumulative sum, and each instance can be the start of a new valid subarray.

Q7: What is the time and space complexity of the provided `subarraySum` solution?
3. Time: O(n), Space: O(n)
Explanation: The algorithm iterates through the array once (O(n) time), and in the worst case, the map can store n distinct cumulative sums (O(n) space).

Q8: If `nums = [1, -1, 1, -1, 1]` and `k = 0`, what is the final `count` returned by the algorithm?
3. 6
Explanation: The algorithm correctly identifies all 6 subarrays that sum to 0: `[1, -1]`, `[-1, 1]`, `[1, -1]`, `[-1, 1]`, `[1, -1, 1, -1]`, and `[-1, 1, -1, 1]`.
