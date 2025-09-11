
# Follow-up: Exclusive Time of Functions

Based on the error in the provided `mistakes.js` file, the fundamental concept that seems to be misunderstood is how to **accumulate time for functions that are paused and resumed**. The provided solution overwrites previously calculated times instead of adding to them.

Here are a few targeted questions to probe this concept:

- **Question 1:** When a function `A` runs for a while, gets paused by function `B`, and then resumes later, how should the time `A` ran *before* it was paused be treated when you calculate the time it runs *after* it resumes?

- **Question 2:** In the context of this problem, is a function's total exclusive time always calculated from a single, continuous time interval, or can it be the sum of multiple, separate intervals?

- **Question 3:** If you look at the line `res[st.pop()] = fnTime - prev + 1`, what happens to any time that might have been previously logged for that function ID?
