# Next Permutation Algorithm Answers

## Problem: Next Permutation (Two Pointers)

**Q1:** What is the first step in finding the next permutation of an array?
**Answer: 2**
The first step is to find the rightmost character that is smaller than the character next to it (pivot). This identifies the position where we need to make a change to get the next lexicographically larger permutation.

**Q2:** In the array [1, 3, 5, 4, 3, 2, 1], what is the pivot element that needs to be swapped?
**Answer: 4**
The element 3 at index 1 is the pivot because it's the first element from the right that is smaller than its successor (3 < 5). The suffix [5, 4, 3, 2, 1] is in decreasing order.

**Q3:** After finding the pivot, what element should be swapped with it in [1, 3, 5, 4, 3, 2, 1]?
**Answer: 4**
The element 4 at index 3 is the smallest element in the suffix that is still greater than the pivot (3). This ensures we get the next lexicographically larger permutation.

**Q4:** Why do we reverse the suffix after swapping the pivot in the next permutation algorithm?
**Answer: 1**
We reverse the suffix to ensure it's in ascending order, which gives us the lexicographically smallest arrangement of the remaining elements, making the overall result the next permutation.

**Q5:** What happens when the input array is [3, 2, 1] (completely decreasing order)?
**Answer: 1**
When the array is in completely decreasing order, there's no pivot (i >= 0 condition fails), so the algorithm reverses the entire array to get [1, 2, 3], which is the smallest permutation.

**Q6:** In the worst-case scenario, what is the time complexity of the next permutation algorithm?
**Answer: 3**
The time complexity is O(n) because we traverse the array at most twice: once to find the pivot, once to find the swap element, and once to reverse the suffix.

**Q7:** What is the space complexity of the next permutation algorithm as implemented?
**Answer: 3**
The space complexity is O(1) as the algorithm modifies the input array in-place using only a constant amount of extra space for variables like i, j, and temporary values in swaps.

**Q8:** For the array [1, 2, 3], what will be the result after applying the next permutation algorithm?
**Answer: 1**
The result is [1, 3, 2]. The pivot is 2 (at index 1), it gets swapped with 3 (the only element larger than 2 in the suffix), and then the suffix [3] remains as is since it's already in ascending order.
