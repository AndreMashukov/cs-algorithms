
# Exclusive Time of Functions - Diagram

This document provides a visual and step-by-step explanation of the "Exclusive Time of Functions" algorithm.

## 1. Problem Setup

- **Input:**
  - `n`: The total number of functions.
  - `logs`: A list of strings, where each string is a log entry in the format `"{function_id}:{start|end}:{timestamp}"`.
- **Output:** An array where the `i`-th element is the total exclusive execution time of function `i`.
- **Example:** `n = 2`, `logs = ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]`

## 2. Algorithm Overview

The algorithm uses a stack to keep track of the currently running function. The core idea is to process logs chronologically and calculate the time spent by the function at the top of the stack between consecutive log events.

- A `start` log for a new function means the currently running function (if any) is paused. We calculate the time it ran for and then push the new function onto the stack.
- An `end` log for the current function means it has finished its current execution block. We calculate the time it ran for, add it to its total, and pop it from the stack. The previously paused function (now at the top of the stack) resumes.

We use a `prevTime` variable to keep track of the timestamp of the last event, which is crucial for calculating time intervals.

## 3. Detailed Walkthrough

Let's trace the example: `n = 2`, `logs = ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]`

### Initial State

- `res = [0, 0]` (exclusive times for functions 0 and 1)
- `st = []` (call stack)
- `prevTime = 0`

---

### Log 1: `"0:start:0"`

- **Log Details:** `id=0`, `type=start`, `time=0`
- **Action:** A `start` event.
- **Logic:** The stack is empty, so no other function is running. We push function `0` onto the stack.
- **State Update:**
  - `st.push(0)`
  - `prevTime` is updated to the current log's time.
- **State After:**
  - `res = [0, 0]`
  - `st = [0]`
  - `prevTime = 0`

```
Time:      0
Event:     F0 starts
Stack:     [0]
Timeline:  |
```

---

### Log 2: `"1:start:2"`

- **Log Details:** `id=1`, `type=start`, `time=2`
- **Action:** A `start` event for function `1`. This means the currently running function (`0`) is being paused.
- **Logic:**
  1.  The stack is not empty. The function at the top is `0`.
  2.  Calculate the time function `0` has run since `prevTime`: `time - prevTime` = `2 - 0 = 2`.
  3.  Add this time to function `0`'s total. `res[0] = 0 + 2 = 2`.
  4.  Push the new function `1` onto the stack.
  5.  Update `prevTime` to the current log's time.
- **State After:**
  - `res = [2, 0]`
  - `st = [0, 1]`
  - `prevTime = 2`

```
Time:      0--1--2
Event:     F0    F1 starts
Stack:     [0] -> [0, 1]
Timeline:  |-----|
           F0 runs (2 units)
```

---

### Log 3: `"1:end:5"`

- **Log Details:** `id=1`, `type=end`, `time=5`
- **Action:** An `end` event for function `1`.
- **Logic:**
  1.  The function at the top of the stack is `1`, which matches the log.
  2.  Calculate the time function `1` ran: `time - prevTime + 1` = `5 - 2 + 1 = 4`.
  3.  Add this time to function `1`'s total. `res[1] = 0 + 4 = 4`.
  4.  Pop function `1` from the stack.
  5.  Update `prevTime` to `time + 1` = `5 + 1 = 6`. This is because function `1` ran for the *entirety* of timestamp 5, so the next event starts at time 6.
- **State After:**
  - `res = [2, 4]`
  - `st = [0]`
  - `prevTime = 6`

```
Time:      2--3--4--5
Event:     F1       F1 ends
Stack:     [0, 1] -> [0]
Timeline:        |-----|
                 F1 runs (4 units)
```

---

### Log 4: `"0:end:6"`

- **Log Details:** `id=0`, `type=end`, `time=6`
- **Action:** An `end` event for function `0`.
- **Logic:**
  1.  The function at the top of the stack is `0`.
  2.  Calculate the time function `0` ran since it resumed. The previous event ended at timestamp 5, and `prevTime` was set to 6. So, function `0` resumed at time 6.
  3.  Time elapsed: `time - prevTime + 1` = `6 - 6 + 1 = 1`.
  4.  Add this time to function `0`'s total. `res[0] = 2 + 1 = 3`.
  5.  Pop function `0` from the stack.
  6.  Update `prevTime` to `time + 1` = `6 + 1 = 7`.
- **State After:**
  - `res = [3, 4]`
  - `st = []`
  - `prevTime = 7`

```
Time:      ...5--6
Event:           F0 ends
Stack:     [0] -> []
Timeline:        |
                 F0 resumes and runs (1 unit)
```

---

## 4. Final Result

After processing all logs, the final state is:
- `res = [3, 4]`

### Timeline Summary

```
Timestamp: 0  1  2  3  4  5  6
Function:  F0 F0 F1 F1 F1 F1 F0
           <-----><----------><->
F0 time:     2      +      1      = 3
F1 time:           4             = 4
```

## 5. Key Insights

- **Stack is Key:** The stack perfectly models the function call execution flow, where only the top-most function is active.
- **`prevTime` Logic:** `prevTime` acts as a cursor on the timeline. For a `start` event, the interval is `[prevTime, time - 1]`. For an `end` event, the interval is `[prevTime, time]`.
- **`+1` for End Events:** The `+1` is crucial because timestamps are inclusive. If a function starts at 2 and ends at 5, it runs during timestamps 2, 3, 4, and 5, which is `5 - 2 + 1 = 4` units of time.
- **Updating `prevTime` after `end`:** Setting `prevTime = time + 1` after an `end` event correctly positions the timeline cursor for the *next* available time slot, ensuring the resumed function (if any) starts its clock at the right moment.

## 6. Complexity Analysis

- **Time Complexity:** `O(L)`, where `L` is the number of logs. We iterate through the logs once.
- **Space Complexity:** `O(N)`, where `N` is the number of functions. The stack can, in the worst case, hold `N/2` function calls (a deep chain of calls), and the `res` array is of size `N`.
