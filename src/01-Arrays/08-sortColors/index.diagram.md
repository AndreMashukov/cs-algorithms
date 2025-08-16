# Sort Colors: Dutch National Flag Algorithm

This document explains the single-pass, three-pointer approach (also known as the Dutch National Flag problem) to solve the "Sort Colors" problem.

**Problem:** Given `nums = [2, 0, 2, 1, 1, 0]`, sort it in-place to `[0, 0, 1, 1, 2, 2]`.

---

## Diagram 1: Pointer Roles and Array Partitions

The algorithm uses three pointers (`left`, `i`, `right`) to partition the array into four sections in a single pass.

- `left`: Marks the boundary of the '0' (red) section.
- `i`: The current element being processed.
- `right`: Marks the boundary of the '2' (blue) section.

The invariant maintained throughout the algorithm is:
- `[0, left - 1]`: Contains only `0`s.
- `[left, i - 1]`: Contains only `1`s.
- `[i, right]`: Contains unprocessed elements (`0`s, `1`s, or `2`s).
- `[right + 1, n - 1]`: Contains only `2`s.

```
         <-- 0s -->  <-- 1s -->  <-- Unsorted -->  <-- 2s -->
Array:  [0, ..., 0,  1, ..., 1,  ?, ..., ?,  2, ..., 2]
Index:   0          ^           ^           ^          n-1
                    |
                   left         i         right
```

The goal is to shrink the "Unsorted" region until `i` crosses `right`.

---

## Diagram 2: Step-by-Step Walkthrough

Let's trace the algorithm with `nums = [2, 0, 2, 1, 1, 0]`.

**Initial State:**
`left = 0`, `right = 5`, `i = 0`
`nums`: `[2, 0, 2, 1, 1, 0]`
`l,i`            `r`
 `↓`             `↓`
`[2, 0, 2, 1, 1, 0]`

**Step 1:** `i=0`, `nums[i]=2`. It's a `2`, so swap with `nums[right]`. Decrement `right`.
- `swap(nums[0], nums[5])`
- `nums` becomes `[0, 0, 2, 1, 1, 2]`
- `right` becomes `4`. `i` stays `0`.
`l,i`        `r`
 `↓`         `↓`
`[0, 0, 2, 1, 1, 2]`

**Step 2:** `i=0`, `nums[i]=0`. It's a `0`, so swap with `nums[left]`. Increment `left` and `i`.
- `swap(nums[0], nums[0])` (no change)
- `left` becomes `1`, `i` becomes `1`.
   `l,i`     `r`
    `↓`      `↓`
`[0, 0, 2, 1, 1, 2]`

**Step 3:** `i=1`, `nums[i]=0`. It's a `0`, so swap with `nums[left]`. Increment `left` and `i`.
- `swap(nums[1], nums[1])` (no change)
- `left` becomes `2`, `i` becomes `2`.
      `l,i`  `r`
       `↓`   `↓`
`[0, 0, 2, 1, 1, 2]`

**Step 4:** `i=2`, `nums[i]=2`. It's a `2`, so swap with `nums[right]`. Decrement `right`.
- `swap(nums[2], nums[4])`
- `nums` becomes `[0, 0, 1, 1, 2, 2]`
- `right` becomes `3`. `i` stays `2`.
    `l,i` `r`
       `↓``↓`
`[0, 0, 1, 1, 2, 2]`

**Step 5:** `i=2`, `nums[i]=1`. It's a `1`, so just increment `i`.
- `i` becomes `3`.
       `l` `r,i`
       `↓``↓`
`[0, 0, 1, 1, 2, 2]`

**Step 6:** `i=3`, `nums[i]=1`. It's a `1`, so just increment `i`.
- `i` becomes `4`.
- Now `i > right` (`4 > 3`), so the loop terminates.

**Final Result:**
The array is sorted in-place.
`nums`: `[0, 0, 1, 1, 2, 2]`
