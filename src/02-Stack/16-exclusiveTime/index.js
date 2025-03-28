// 636. Exclusive Time of Functions
// https://leetcode.com/problems/exclusive-time-of-functions/description
// https://www.youtube.com/watch?v=CBJI_lZxYU8
// On a single-threaded CPU, we execute a program containing n functions. Each function has a unique ID between 0 and n-1.

// Function calls are stored in a call stack:
// when a function call starts, its ID is pushed onto the stack,
// and when a function call ends, its ID is popped off the stack.
// The function whose ID is at the top of the stack
// is the current function being executed. Each time a function starts or ends,
//  we write a log with the ID,
// \whether it started or ended, and the timestamp.

// You are given a list logs, where logs[i]
// represents the ith log message formatted
// as a string "{function_id}:{"start" | "end"}:{timestamp}".
// For example, "0:start:3" means a function call
// with function ID 0 started at the beginning of timestamp 3,
// and "1:end:2" means a function call with function ID 1 ended
// at the end of timestamp 2. Note that a function can be called
// multiple times, possibly recursively.

// A function's exclusive time is the sum of execution times
// for all function calls in the program.
// For example, if a function is called twice,
// one call executing for 2 time units and another
// call executing for 1 time unit, the exclusive time is 2 + 1 = 3.

// Return the exclusive time of each function in an array,
// where the value at the ith index represents
// the exclusive time for the function with ID i.

const exclusiveTime = (n, logs) => {
  // Initialize an array for the exclusive times of each function
  const res = Array(n).fill(0)
  // Stack to track the currently running function ID
  const st = []
  // Keep track of the previous timestamp to calculate intervals
  let prevTime = 0

  for (const log of logs) {
    // Each log is in the format "id:type:time"
    const [id, type, time] = log.split(':')
    const fnId = parseInt(id)
    const fnTime = parseInt(time)

    if (type === 'start') {
      // If there's a function running, add to its time the gap since prevTime
      if (st.length) {
        res[st[st.length - 1]] += fnTime - prevTime
      }
      // Push the new function onto the stack
      st.push(fnId)
      // Update the reference for the next interval
      prevTime = fnTime
    } else {
      // When a function ends, pop it and add the total execution time
      res[st.pop()] += fnTime - prevTime + 1
      // Update prevTime so the next function can measure correctly
      prevTime = fnTime + 1
    }
  }

  return res
}

console.log(
  exclusiveTime(2, ['0:start:0', '1:start:2', '1:end:5', '0:end:6'])
) // Output: [3, 4]

// Explanation using the logs ['0:start:0', '1:start:2', '1:end:5', '0:end:6']:

// 0:start:0

// Function 0 starts.
// prevTime is set to 0. Stack: [0].
// 1:start:2

// Function 0 runs from time 0 to 2 → 2 units for function 0.
// Then function 1 starts at time 2.
// prevTime is set to 2. Stack: [0, 1].
// 1:end:5

// Function 1 runs from time 2 to 5 → 4 units (5 − 2 + 1).
// prevTime is set to 6 (5 + 1). Stack: [0].
// 0:end:6

// Function 0 resumes at time 5 (right after function 1 ended) until time 6 → 1 unit.
// prevTime becomes 7 (6 + 1). Stack becomes empty.
// Totals:

// Function 0: 3 units (2 + 1).
// Function 1: 4 units.
// Hence, the output is [3, 4].