Problem: Subarray Sum Equals K (Prefix Sum)

Q1: What is the primary purpose of the `Map` data structure in the `subarraySum` algorithm?
1. To store the input array `nums` for quick lookups.
2. To track the frequency of each number in the input array.
3. To store cumulative sums and their frequencies for efficient counting.
4. To store the resulting subarrays that sum up to `k`.

Q2: Why is the map initialized with `map.set(0, 1)` before the loop begins?
1. To handle cases where the input array `nums` is empty.
2. To correctly count subarrays that start from the beginning of the array (index 0).
3. To avoid errors when the cumulative sum `sum` becomes zero during iteration.
4. To ensure the algorithm works correctly for arrays containing only negative numbers.

Q3: In the `subarraySum` algorithm, what does `map.has(sum - k)` check for?
1. It checks if a previous subarray exists that needs to be subtracted to get the sum `k`.
2. It verifies if the target `k` has been seen before as a cumulative sum.
3. It determines if the current cumulative `sum` is equal to the target `k`.
4. It looks for a prior cumulative sum that, when removed from the current `sum`, results in `k`.

Q4: Given `nums = [1, 1, 1]` and `k = 2`, what is the value of `count` after the second iteration (i.e., after processing `nums[1]`)?
1. 0
2. 1
3. 2
4. 3

Q5: How would the algorithm behave if the input array `nums` contains only negative numbers, for example, `nums = [-1, -2, -3]` and `k = -3`?
1. It would fail because the cumulative sum will always decrease.
2. It will correctly identify the two subarrays `[-1, -2]` and `[-3]`.
3. It will only find the subarray `[-3]` and return a count of 1.
4. The map would not be able to handle negative cumulative sums.

Q6: What is the primary reason for updating the map with `map.set(sum, (map.get(sum) || 0) + 1)` inside the loop?
1. To ensure that every cumulative sum is stored, preventing duplicates.
2. To keep track of how many times each cumulative sum has occurred.
3. To overwrite the previous sum with the new one for memory efficiency.
4. To initialize the frequency of a new cumulative sum to 1.

Q7: What is the time and space complexity of the provided `subarraySum` solution?
1. Time: O(n^2), Space: O(1)
2. Time: O(n log n), Space: O(n)
3. Time: O(n), Space: O(n)
4. Time: O(n^2), Space: O(n)

Q8: If `nums = [1, -1, 1, -1, 1]` and `k = 0`, what is the final `count` returned by the algorithm?
1. 2
2. 4
3. 6
4. 8
