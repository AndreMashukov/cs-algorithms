# Contiguous Array (Hash Map) - Answers

**Q1: What is the primary purpose of the `map` in the `findMaxLength` algorithm?**
2. To store the cumulative count of (1s minus 0s) and the first index where that count appeared.
**Explanation:** The map tracks the running sum (`count`). When a `count` value repeats, it means the subarray between the two indices where this count occurred has an equal number of 0s and 1s.

**Q2: What is the significance of initializing the map with `map.set(0, -1)`?**
2. It handles the edge case where the longest subarray with an equal number of 0s and 1s starts from index 0.
**Explanation:** If the count becomes 0 at index `i`, the length of the subarray from the start is `i - (-1) = i + 1`. This initialization correctly handles this scenario.

**Q3: For the input `nums = [0, 1, 0]`, what will be the value of `count` and `max` after the final iteration of the loop (at `i = 2`)?**
1. `count` will be -1, and `max` will be 2.
**Explanation:**
- i=0, num=0: count=-1, map={0:-1, -1:0}
- i=1, num=1: count=0, max=max(0, 1-map.get(0))=max(0,1-(-1))=2, map={0:-1, -1:0}
- i=2, num=0: count=-1, max=max(2, 2-map.get(-1))=max(2,2-0)=2. Final count is -1, max is 2.

**Q4: In the expression `max = Math.max(max, i - map.get(count))`, what does `i - map.get(count)` calculate?**
2. The length of a contiguous subarray that has an equal number of 0s and 1s.
**Explanation:** `i` is the current index, and `map.get(count)` is the first index where the same cumulative count was seen. The difference is the length of a subarray with a net count change of zero, implying an equal number of 0s and 1s.

**Q5: Why does the algorithm not update the index in the map if a `count` is already present (i.e., inside the `if (map.has(count))` block)?**
2. To find the longest possible subarray, we need the earliest index where a specific count was seen.
**Explanation:** The goal is to maximize the length (`i - map.get(count)`). Using the earliest (and therefore smallest) index for `map.get(count)` results in the greatest possible length.

**Q6: What happens if the input array is `[0, 0, 0, 0]`?**
3. The function will return 0.
**Explanation:** The `count` will become -1, -2, -3, and -4. Since no `count` value ever repeats, the `if (map.has(count))` condition is never met, and `max` remains at its initial value of 0.

**Q7: What is the time and space complexity of the `findMaxLength` function?**
2. Time: O(n), Space: O(n)
**Explanation:** The algorithm iterates through the input array once, making the time complexity O(n). The map can store up to n distinct count values in the worst case, leading to a space complexity of O(n).

**Q8: If `nums = [0, 1, 1, 0, 1, 1]`, what is the final value returned by `findMaxLength`?**
2. 4
**Explanation:**
- `[0, 1]` -> count 0, max 2
- `[0, 1, 1]` -> count 1
- `[0, 1, 1, 0]` -> count 0, max = max(2, 3 - (-1)) = 4
- The subarray `[0, 1, 1, 0]` has length 4. No longer subarray with this property is found.
