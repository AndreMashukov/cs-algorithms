# Problem: Course Schedule (Graph Cycle Detection with DFS)

Q1: What property of the course prerequisite graph guarantees that all courses can be completed?
1. The graph is connected
2. The graph is acyclic (a Directed Acyclic Graph)
3. Every node has out-degree at most 1
4. Every node has in-degree at most 1

Q2: In the DFS-based solution, what is the base case for returning true for a course c?
1. c currently has no prerequisites (its adjacency list is empty)
2. c is in the visiting set
3. c has in-degree exactly 1
4. c appears at least once as a prerequisite

Q3: Why is a "visiting" set (or recursion stack set) maintained during DFS?
1. To count the number of prerequisites for each course
2. To detect cycles by identifying back edges to nodes currently in the recursion stack
3. To ensure the graph is connected before starting DFS
4. To reduce time complexity from O(V+E) to O(log V)

Q4: What are the time and auxiliary space complexities of the DFS-based cycle detection over all courses (V = numCourses, E = prerequisites length)?
1. Time: O(V+E), Aux Space: O(V) excluding the input adjacency list
2. Time: O(V*E), Aux Space: O(1)
3. Time: O(E), Aux Space: O(E)
4. Time: O(V log V), Aux Space: O(log V)

Q5: Given numCourses = 4 and prerequisites = [[1,0], [2,1], [3,2]], what does the algorithm return?
1. true, because the graph is a simple chain with no cycles
2. false, because there is a cycle among 0,1,2
3. true, but only if we start DFS from course 3
4. false, because course 0 has in-degree 0

Q6: Given numCourses = 3 and prerequisites = [[1,0], [0,1], [2,1]], what does the algorithm return?
1. true, because 2 depends only on 1
2. false, because there is a cycle between 0 and 1
3. true, because every course appears in prerequisites
4. false, because there are no nodes with in-degree 0

Q7: After a course c is fully processed (all its prerequisites were validated), which design choice prevents reprocessing it on future DFS calls?
1. Increasing the maximum recursion depth
2. Clearing c's adjacency list (memoization) or marking c as visited/processed
3. Sorting the prerequisites list lexicographically
4. Using a queue instead of recursion

Q8: Which edge cases must the algorithm correctly handle?
1. Courses with no prerequisites at all
2. Self-dependency like [a, a]
3. Multiple disconnected components in the course graph
4. All of the above
