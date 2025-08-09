# Answers: Course Schedule (Graph Cycle Detection with DFS)

Q1: What property of the course prerequisite graph guarantees that all courses can be completed?
Correct answer: 2
Explanation: A Directed Acyclic Graph (DAG) has no cycles, enabling a valid topological ordering to complete all courses.

Q2: In the DFS-based solution, what is the base case for returning true for a course c?
Correct answer: 1
Explanation: If c's prerequisite list is empty, it can be completed immediately; the algorithm treats this as the base case.

Q3: Why is a "visiting" set (or recursion stack set) maintained during DFS?
Correct answer: 2
Explanation: Encountering a node already in the recursion stack indicates a back edge and thus a cycle.

Q4: What are the time and auxiliary space complexities of the DFS-based cycle detection over all courses (V = numCourses, E = prerequisites length)?
Correct answer: 1
Explanation: Each node and edge is explored at most once, giving O(V+E) time; the recursion stack and state sets require O(V) auxiliary space.

Q5: Given numCourses = 4 and prerequisites = [[1,0], [2,1], [3,2]], what does the algorithm return?
Correct answer: 1
Explanation: The graph is a linear chain 0→1→2→3 with no cycles; all courses can be finished.

Q6: Given numCourses = 3 and prerequisites = [[1,0], [0,1], [2,1]], what does the algorithm return?
Correct answer: 2
Explanation: 0→1→0 forms a cycle, making it impossible to complete all courses.

Q7: After a course c is fully processed (all its prerequisites were validated), which design choice prevents reprocessing it on future DFS calls?
Correct answer: 2
Explanation: Clearing c's adjacency list (or marking it as processed) memoizes the result, avoiding repeated DFS work.

Q8: Which edge cases must the algorithm correctly handle?
Correct answer: 4
Explanation: The algorithm should handle courses without prerequisites, self-loops [a,a], and disconnected components.
