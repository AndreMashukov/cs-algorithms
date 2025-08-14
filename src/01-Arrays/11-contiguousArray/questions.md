# Contiguous Array (Hash Map)

**Q1: What is the primary purpose of the `map` in the `findMaxLength` algorithm?**
1. To store the frequency of each number (0 and 1) in the input array.
2. To store the cumulative count of (1s minus 0s) and the first index where that count appeared.
3. To keep track of the longest subarray found so far.
4. To store the indices of all zeros and ones to calculate the distance between them.

**Q2: What is the significance of initializing the map with `map.set(0, -1)`?**
1. It prevents an error when the input array is empty.
2. It handles the edge case where the longest subarray with an equal number of 0s and 1s starts from index 0.
3. It sets a default value for the maximum length.
4. It initializes the count of zeros and ones to be equal before the loop begins.

**Q3: For the input `nums = [0, 1, 0]`, what will be the value of `count` and `max` after the final iteration of the loop (at `i = 2`)?**
1. `count` will be -1, and `max` will be 2.
2. `count` will be 0, and `max` will be 2.
3. `count` will be -1, and `max` will be 0.
4. `count` will be 1, and `max` will be 2.

**Q4: In the expression `max = Math.max(max, i - map.get(count))`, what does `i - map.get(count)` calculate?**
1. The number of elements between the current index and the start of the array.
2. The length of a contiguous subarray that has an equal number of 0s and 1s.
3. The total count of 0s and 1s encountered so far.
4. The distance to the last occurrence of the same element.

**Q5: Why does the algorithm not update the index in the map if a `count` is already present (i.e., inside the `if (map.has(count))` block)?**
1. Because updating the index would lead to incorrect time complexity.
2. To find the longest possible subarray, we need the earliest index where a specific count was seen.
3. Because the map data structure in JavaScript does not allow updating values.
4. To ensure the `count` variable does not become negative.

**Q6: What happens if the input array is `[0, 0, 0, 0]`?**
1. The function will return 4.
2. The `if (map.has(count))` condition will never be true.
3. The function will return 0.
4. The function will throw an error because there are no 1s.

**Q7: What is the time and space complexity of the `findMaxLength` function?**
1. Time: O(n^2), Space: O(n)
2. Time: O(n), Space: O(n)
3. Time: O(n log n), Space: O(1)
4. Time: O(n), Space: O(1)

**Q8: If `nums = [0, 1, 1, 0, 1, 1]`, what is the final value returned by `findMaxLength`?**
1. 6
2. 4
3. 2
4. 0
