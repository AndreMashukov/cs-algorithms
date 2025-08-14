## Problem: Word Ladder (BFS)

Q1: What does the implementation return when `begin === end`?
1. 0
2. 1
3. The length of `wordList`
4. It throws an error

Q2: Which data structure in this implementation ensures a word is not revisited once enqueued?
1. A `Set` storing remaining words, deleting neighbors upon enqueue
2. A `visited` boolean array indexed by hash
3. A `Map` from word to parent
4. A priority queue ordered by Hamming distance

Q3: What is the time complexity with W words explored and word length L?
1. O(W · L · 26) ≈ O(W · L)
2. O(W²)
3. O(L²)
4. O(W + L)

Q4: Which statement about the queue usage is true in this code?
1. Using `Array.prototype.shift()` makes each dequeue O(n), risking O(n²) overall queue cost
2. The code uses `pop()` for O(1) dequeues
3. The queue is implemented as a linked list for O(1) dequeues
4. Dequeue cost is irrelevant to overall performance here

Q5: For `begin = "hit"`, `end = "cog"`, and `wordList = ["hot","dot","dog","lot","log","cog"]`, what value does the function return?
1. 4
2. 5
3. 6
4. 0

Q6: What happens if `end` is not present in `wordList`?
1. The function immediately returns 0 without running BFS
2. The function assumes `end` can be generated and runs BFS anyway
3. The function returns 1
4. The function builds an adjacency map first, then decides

Q7: Why does the algorithm delete a neighbor from the `Set` at the moment it is enqueued?
1. To prevent duplicate enqueues in the same or future levels, preserving BFS minimality and performance
2. To keep the set lexicographically ordered
3. To ensure the returned path counts edges instead of nodes
4. To avoid string slicing overhead in later iterations

Q8: How is the transformation length `res` counted in this implementation?
1. Incremented once per BFS level before processing, so it counts nodes in the path and includes both `begin` and `end`
2. Incremented after each node, so it counts the total number of dequeues
3. Incremented only when a neighbor is enqueued, so it equals the branching factor
4. Never incremented; the length is derived from the queue size


