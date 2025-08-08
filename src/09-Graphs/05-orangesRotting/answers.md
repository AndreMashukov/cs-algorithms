# Answers for Oranges Rotting (Breadth-First Search)

**Q1: Why is Breadth-First Search (BFS) the most suitable algorithm for the Oranges Rotting problem?**
- **Correct Answer:** 1
- **Explanation:** BFS explores neighbors level by level, perfectly modeling the simultaneous spread of rot each minute. This ensures that the shortest time is found because we are expanding outwards from all rotten oranges at the same rate.

**Q2: What is the primary role of the initial pass through the grid before the main BFS loop begins?**
- **Correct Answer:** 2
- **Explanation:** The initial scan is crucial for setting up the BFS. It identifies all starting points for the search (the initially rotten oranges) and establishes the win condition (the total number of fresh oranges that need to be rotted).

**Q3: Given the grid `[[2, 1, 1], [0, 1, 1], [1, 0, 1]]`, what is the state of the `fresh` orange count and the queue `q` after the first minute of rotting (`time = 1`)?**
- **Correct Answer:** 4
- **Explanation:** Initially, `fresh` is 5 and `q` is `[[0, 0]]`. After one minute, the orange at `[0, 0]` rots its neighbor at `[0, 1]`. The `fresh` count becomes 4, and the newly rotted orange `[0, 1]` is added to the queue. The original rotten orange `[0,0]` is removed from the queue.

**Q4: Why is the `fresh` orange counter essential for the algorithm's final correctness check?**
- **Correct Answer:** 2
- **Explanation:** After the BFS completes (meaning the queue is empty), the `fresh` counter tells us if any fresh oranges remain. If `fresh` is not zero, it means some oranges were unreachable, and the function correctly returns -1.

**Q5: What is the expected output if the input grid contains no fresh oranges to begin with, like `[[2, 0, 2], [0, 0, 2]]`?**
- **Correct Answer:** 3
- **Explanation:** The problem asks for the time elapsed until no cell has a fresh orange. If there are no fresh oranges from the start, no time needs to pass. The `while` loop condition `fresh > 0` is immediately false, so the function returns the initial `time` value of 0.

**Q6: How does the algorithm handle an edge case where a fresh orange is completely surrounded by empty cells, making it impossible to rot?**
- **Correct Answer:** 2
- **Explanation:** The BFS will proceed until all reachable oranges are rotten and the queue is empty. At that point, if the `fresh` counter is still greater than zero, it signifies that some oranges were isolated and could not be reached. The final check `fresh === 0 ? time : -1` handles this by returning -1.

**Q7: What is the time complexity of this solution, where `R` is the number of rows and `C` is the number of columns?**
- **Correct Answer:** 1
- **Explanation:** The time complexity is O(R * C) because, in the worst-case scenario, every cell is visited and processed once during the initial scan and once during the BFS traversal.

**Q8: What determines the worst-case space complexity of this algorithm?**
- **Correct Answer:** 3
- **Explanation:** The space complexity is determined by the maximum size of the queue. In the worst case, all oranges could be rotten initially, or a large number of oranges could become rotten in a single minute, leading to a queue size proportional to the total number of cells, O(R * C).
