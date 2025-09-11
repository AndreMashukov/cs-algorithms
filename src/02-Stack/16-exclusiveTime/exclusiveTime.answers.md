
# Exclusive Time of Functions - Answers

### Problem: Exclusive Time of Functions (Stack)

**Q1: What is the primary role of the stack in the `exclusiveTime` algorithm?**
- **Correct Answer:** 2
- **Explanation:** The stack mimics the real call stack of a single-threaded CPU. The function at the top is the one currently executing, and any functions below it are paused.

**Q2: In the `exclusiveTime` algorithm, why is `prevTime` updated to `fnTime` when a function starts, but to `fnTime + 1` when a function ends?**
- **Correct Answer:** 2
- **Explanation:** When a function starts at `fnTime`, that time unit is consumed by the new function. When a function ends at `fnTime`, it runs for that full time unit, so the next available time slot is `fnTime + 1`.

**Q3: Given `n = 1` and `logs = ["0:start:0", "0:end:2"]`, what is the calculated exclusive time for function 0?**
- **Correct Answer:** 3
- **Explanation:** The function runs during the time units 0, 1, and 2. The duration is calculated as `endTime - startTime + 1`, which is `2 - 0 + 1 = 3`.

**Q4: How does the algorithm handle a scenario where a function is called recursively, such as `["0:start:0", "0:start:2", "0:end:3", "0:end:5"]`?**
- **Correct Answer:** 1
- **Explanation:** The stack-based approach naturally handles recursion. The outer call is paused, its time is calculated up to the point of the inner call, and it resumes after the inner call is popped from the stack.

**Q5: What is the time complexity of the `exclusiveTime` algorithm, where L is the number of logs and N is the number of functions?**
- **Correct Answer:** 1
- **Explanation:** The algorithm involves a single pass through the `logs` array. Stack operations (push and pop) are O(1), making the overall time complexity linear with respect to the number of logs.

**Q6: What is the purpose of the `if (st.length)` check before calculating the time for a paused function during a `start` event?**
- **Correct Answer:** 1
- **Explanation:** If the stack is empty, it means no function was running before the current `start` event. This check prevents trying to access `st[st.length - 1]` on an empty stack, which would cause an error.

**Q7: Why is the exclusive time for a function that is ending calculated as `fnTime - prevTime + 1`?**
- **Correct Answer:** 2
- **Explanation:** Timestamps are inclusive. A function starting at `prevTime` and ending at `fnTime` runs for all time units in that range, so `+1` is needed to count both the start and end time units.

**Q8: What would be the result if the input `logs` array is empty?**
- **Correct Answer:** 3
- **Explanation:** The `res` array is initialized with zeros. If the `logs` array is empty, the processing loop is never entered, and the initial `res` array is returned, which is the correct outcome.
