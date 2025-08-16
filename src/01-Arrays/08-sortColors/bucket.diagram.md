# Sort Colors: Bucket Sort Method

This document explains the "Sort Colors" problem using a two-pass bucket sort approach. The colors are represented by integers: 0 for red, 1 for white, and 2 for blue.

**Problem:** Given `nums = [2, 0, 2, 1, 1, 0]`, sort it in-place to `[0, 0, 1, 1, 2, 2]`.

The algorithm consists of two main phases:
1.  **Counting Pass:** Count the frequency of each color.
2.  **Overwrite Pass:** Rebuild the array using the color counts.

---

## Diagram 1: Counting Pass

In this phase, we iterate through the input array `nums` to count how many times each color (0, 1, 2) appears. We use a `counts` array of size 3, initialized to all zeros.

**Initial State:**
`nums`: `[2, 0, 2, 1, 1, 0]`
`counts`: `[0, 0, 0]`

**Step-by-step count:**

```
Iteration 1: num = 2
nums:   [2, 0, 2, 1, 1, 0]
         ^
counts: [0, 0, 1]  (counts[2]++)

Iteration 2: num = 0
nums:   [2, 0, 2, 1, 1, 0]
            ^
counts: [1, 0, 1]  (counts[0]++)

Iteration 3: num = 2
nums:   [2, 0, 2, 1, 1, 0]
               ^
counts: [1, 0, 2]  (counts[2]++)

Iteration 4: num = 1
nums:   [2, 0, 2, 1, 1, 0]
                  ^
counts: [1, 1, 2]  (counts[1]++)

Iteration 5: num = 1
nums:   [2, 0, 2, 1, 1, 0]
                     ^
counts: [1, 2, 2]  (counts[1]++)

Iteration 6: num = 0
nums:   [2, 0, 2, 1, 1, 0]
                        ^
counts: [2, 2, 2]  (counts[0]++)
```

**Final Counts:**
After the pass, the `counts` array tells us the frequency of each color:
- `counts[0] = 2` (two reds)
- `counts[1] = 2` (two whites)
- `counts[2] = 2` (two blues)

---

## Diagram 2: Overwrite Pass

Now, we use the `counts` array to overwrite the original `nums` array in sorted order. We use a pointer `i` to keep track of the current position in `nums`.

**Initial State:**
`counts`: `[2, 2, 2]`
`nums`: `[2, 0, 2, 1, 1, 0]` (This will be overwritten)
`i`: `0`

**Step-by-step overwrite:**

**1. Placing 0s (reds):**
`counts[0]` is 2, so we write `0` two times.
```
nums: [0, _, _, _, _, _]  (i=1)
nums: [0, 0, _, _, _, _]  (i=2)
```

**2. Placing 1s (whites):**
`counts[1]` is 2, so we write `1` two times.
```
nums: [0, 0, 1, _, _, _]  (i=3)
nums: [0, 0, 1, 1, _, _]  (i=4)
```

**3. Placing 2s (blues):**
`counts[2]` is 2, so we write `2` two times.
```
nums: [0, 0, 1, 1, 2, _]  (i=5)
nums: [0, 0, 1, 1, 2, 2]  (i=6)
```

**Final Result:**
The `nums` array is now sorted according to the colors.
`nums`: `[0, 0, 1, 1, 2, 2]`
