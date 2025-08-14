## Problem: Word Ladder (BFS)

Q1: What does the implementation return when `begin === end`?
Correct answer: 1
Explanation: The code explicitly checks `begin === end` and returns 0 before BFS starts.

Q2: Which data structure in this implementation ensures a word is not revisited once enqueued?
Correct answer: 1
Explanation: The `Set` of remaining words serves as visited; neighbors are deleted upon enqueue to avoid duplicates.

Q3: What is the time complexity with W words explored and word length L?
Correct answer: 1
Explanation: Each explored word tries 26 letters per position across L positions, giving O(W · L · 26) ≈ O(W · L).

Q4: Which statement about the queue usage is true in this code?
Correct answer: 1
Explanation: Using `shift()` on an array is O(n) per dequeue, which can lead to quadratic queue overhead.

Q5: For `begin = "hit"`, `end = "cog"`, and `wordList = ["hot","dot","dog","lot","log","cog"]`, what value does the function return?
Correct answer: 2
Explanation: BFS levels are hit→hot→dot/lot→dog/log→cog, so the node-count path length is 5.

Q6: What happens if `end` is not present in `wordList`?
Correct answer: 1
Explanation: The implementation checks `!words.has(end)` first and returns 0 immediately.

Q7: Why does the algorithm delete a neighbor from the `Set` at the moment it is enqueued?
Correct answer: 1
Explanation: Deleting on enqueue prevents multiple enqueues of the same word across the same or later levels, ensuring minimal exploration.

Q8: How is the transformation length `res` counted in this implementation?
Correct answer: 1
Explanation: `res` is incremented per BFS level (before processing nodes in that level), so it counts nodes in the path including `begin` and `end`.


