# Contiguous Array Algorithm Visualizations

This document provides visual explanations for the `findMaxLength` algorithm, which finds the maximum length of a contiguous subarray with an equal number of 0s and 1s.

## Diagram 1: High-Level Algorithm Flow

This diagram shows the overall logic of the algorithm. The core idea is to use a `count` variable that increments for `1`s and decrements for `0`s. A hash map stores the first time a specific `count` is seen.

```
                +------------------+
                |      Start       |
                +------------------+
                        |
                        v
+----------------------------------------------------+
| Initialize:                                        |
| `map = new Map()` -> `map.set(0, -1)`              |
| `max = 0`                                          |
| `count = 0`                                        |
+----------------------------------------------------+
                        |
                        v
+----------------------------------------------------+
| Loop through `nums` from `i = 0` to `nums.length - 1` |
+----------------------------------------------------+
                        |
                        v
     +------------------------------------------+
     | Update count:                            |
     | `nums[i] === 1` ? `count++` : `count--`  |
     +------------------------------------------+
                        |
                        v
            +-----------------------+
            | Does `map` have `count`? |
            +-----------------------+
                 /               \
           (Yes) /                 \ (No)
                /                   \
               v                     v
+-------------------------------+  +-----------------------------+
| max = max(max, i - map.get(count)) |  | map.set(count, i)           |
+-------------------------------+  +-----------------------------+
               \                   /
                \                 /
                 +---------------+ 
                        |
                        v
+----------------------------------------------------+
|                  End of Loop                     |
+----------------------------------------------------+
                        |
                        v
                +------------------+
                |   Return `max`   |
                +------------------+
```

---

## Diagram 2: Step-by-Step Walkthrough

Let's trace the algorithm with the input `nums = [0, 1, 1, 0, 1]`.

**Initial State:**
- `nums` = `[0, 1, 1, 0, 1]`
- `max` = `0`
- `count` = `0`
- `map` = `{ 0: -1 }`

| Step (i) | `nums[i]` | `count` | `map.has(count)`? | Action | `max` | `map` State |
| :---: | :---: | :---: | :---: | :--- | :---: | :--- |
| 0 | 0 | -1 | No | `map.set(-1, 0)` | 0 | `{ 0: -1, -1: 0 }` |
| 1 | 1 | 0 | Yes | `max = max(0, 1 - map.get(0))` -> `max = max(0, 1 - (-1))` -> `2` | 2 | `{ 0: -1, -1: 0 }` |
| 2 | 1 | 1 | No | `map.set(1, 2)` | 2 | `{ 0: -1, -1: 0, 1: 2 }` |
| 3 | 0 | 0 | Yes | `max = max(2, 3 - map.get(0))` -> `max = max(2, 3 - (-1))` -> `4` | 4 | `{ 0: -1, -1: 0, 1: 2 }` |
| 4 | 1 | 1 | Yes | `max = max(4, 4 - map.get(1))` -> `max = max(4, 4 - 2)` -> `4` | 4 | `{ 0: -1, -1: 0, 1: 2 }` |

**Final Result:** `max` = `4`. The longest subarray is `[0, 1, 1, 0]`.

---

## Diagram 3: The Core Concept - Why Repeating Counts Matter

The algorithm's key insight is that if the cumulative `count` at two different indices `j` and `i` is the same, the subarray between `j+1` and `i` must contain an equal number of 0s and 1s.

Let's visualize this:

**Treat `0` as `-1` and `1` as `1`.**

`nums`:      `[n_0, n_1, ..., n_j, ..., n_i, ...]`
`Indices`:    `0,   1,  ...,  j,  ...,  i,  ...`

The `count` at any index `k` is the sum of elements from `0` to `k`.

`count(k) = sum(nums[0]...nums[k])`

**Scenario:** Assume `count(j) = C` and later `count(i) = C`.

`count(j) = n_0 + n_1 + ... + n_j`
`count(i) = n_0 + n_1 + ... + n_j + n_{j+1} + ... + n_i`

Since `count(i) = count(j)`:
`C = C + n_{j+1} + ... + n_i`

This implies:
`n_{j+1} + ... + n_i = 0`

A sum of `0` means the number of `+1`s (representing `1`s) and `-1`s (representing `0`s) in the subarray `nums[j+1 ... i]` is equal.

**Example:** `nums = [0, 1, 1, 0, 1]`
`Transformed`: `[-1, 1, 1, -1, 1]`

`Index | Element | Cumulative Count (C)`
`------------------------------------`
`  -1  |  (start)|        0`  <-- `map.set(0, -1)`
`   0  |    -1   |       -1`
`   1  |     1   |        0`  <-- `C=0` repeats! Subarray `nums[0...1]` has length `1 - (-1) = 2`.
`   2  |     1   |        1`
`   3  |    -1   |        0`  <-- `C=0` repeats! Subarray `nums[0...3]` has length `3 - (-1) = 4`.
`   4  |     1   |        1`  <-- `C=1` repeats! Subarray `nums[3...4]` has length `4 - 2 = 2`.

The length of this subarray is `i - j`. The algorithm stores the *first* index `j` for each count `C` to ensure we calculate the *maximum* possible length when we encounter `C` again at index `i`.

```