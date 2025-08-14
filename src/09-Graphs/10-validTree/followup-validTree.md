### Socratic Follow-Up: Valid Tree (Graphs)

**Diagnosis**
- Your attempt correctly tries to detect cycles with DFS while skipping the parent. However, it doesn’t ensure that all `n` nodes are connected, and it doesn’t use the key tree invariant that a valid tree with `n` nodes must have exactly `n - 1` edges. This can accept a disconnected acyclic graph as a tree.

**Targeted Questions**
- What two properties must an undirected graph satisfy to be a tree? How do these relate to connectivity, presence of cycles, and the `edges === n - 1` invariant?
- If you start DFS/BFS from node `0`, what specific condition would guarantee that you have visited every node in the graph? Why can a DFS that returns without finding a cycle still be wrong?
- How does checking `edges.length === n - 1` help you rule out both cycles and disconnections? Under what circumstance could that equality still fail to guarantee a tree unless you add one more check?

**What-If Scenario**
- Try this small input that highlights the connectivity requirement:
  - `n = 4`
  - `edges = [[0,1], [2,3]]`
  - Question: Should this be a valid tree? Why or why not? Walk through your DFS from `0` and explain which nodes are visited and what invariant is violated.

Write your reasoning before checking any references. If you want a second probe afterward, try:
- `n = 5`, `edges = [[0,1],[1,2],[2,3],[3,4],[1,3]]` (cycle present)


