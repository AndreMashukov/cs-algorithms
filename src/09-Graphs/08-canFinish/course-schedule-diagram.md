### Course Schedule (LeetCode 207) — Visual Guide

This explains the DFS cycle detection approach over the course dependency graph.

**Edge direction**: if `prerequisites[i] = [a, b]`, then you must take `b` before `a`, i.e. `b -> a`.

#### Example (no cycle)
`numCourses = 4`
`prerequisites = [[1,0], [2,0], [3,1], [3,2]]`

Graph (arrows show prerequisites):

```text
    0
   / \
  v   v
  1   2
   \ /
    v
    3
```

Adjacency list (preMap: course -> prerequisites):

```text
0: []
1: [0]
2: [0]
3: [1, 2]
```

#### DFS states per node
- **unvisited**: not seen yet
- **visiting**: currently on recursion stack (used to detect cycles)
- **done**: fully processed and memoized (we set `preMap[crs] = []` after processing)

#### Cycle detection rule
If DFS re-enters a node that is in the "visiting" state, we found a cycle -> cannot finish courses.

#### Cycle example
`prerequisites = [[0,1], [1,2], [2,0]]`

Graph:

```text
0 <- 1 <- 2
^         |
|_________|
```

DFS walkthrough (starting at 0):

```text
visiting = {0}
  -> dfs(1): visiting = {0,1}
    -> dfs(2): visiting = {0,1,2}
      -> dfs(0): 0 is already in visiting -> cycle detected -> return false
```

#### Key idea
- Build `preMap` (adjacency list of prerequisites)
- For each course `c`, run `dfs(c)`
- In `dfs`:
  - if `crs` in `visiting` -> cycle
  - if `preMap[crs]` is empty -> already resolved
  - mark `crs` as visiting; `dfs` on each prerequisite
  - unmark visiting; set `preMap[crs] = []` (memoize); return true


#### Why `visiting.delete(crs)`?
This is the backtracking step: once all prerequisites of `crs` finish without detecting a cycle, `crs` is no longer on the active recursion path. We remove it from the `visiting` set to reflect that.

Before/after in the `visiting` set:

```text
enter dfs(crs):   visiting = {A, B}   -> add crs -> {A, B, crs}
exit  dfs(crs):   visiting = {A, B, crs} -> delete crs -> {A, B}
```

Recursion stack view:

```text
dfs(parent)
  -> dfs(crs)            // add crs to visiting
     -> dfs(pre1) ... OK
     -> dfs(pre2) ... OK
  backtrack from crs     // visiting.delete(crs)
```

If we skipped this removal, ancestors or later DFS calls could see `crs` as still "in-progress" and incorrectly report a cycle.


#### DFS state machine and overall flow

Node state transitions during DFS on a course `crs`:

```text
unvisited  --enter dfs(crs)-->  visiting  --all prerequisites resolved-->  done
                    ^                             |
                    |------ re-enter while visiting (cycle) -----|
```

High-level DFS over all courses:

```text
for each course c in [0..numCourses-1]:
  if dfs(c) == false: return false
return true
```

Call stack and `visiting` set snapshot (no cycle case):

```text
dfs(3)              visiting = {3}
  -> dfs(1)         visiting = {3,1}
    -> dfs(0)       visiting = {3,1,0}
    <- done(0)      visiting = {3,1}
  <- done(1)        visiting = {3}
  -> dfs(2)         visiting = {3,2}
    -> dfs(0)       visiting = {3,2,0}  (0 already memoized -> returns immediately)
    <- done(0)      visiting = {3,2}
  <- done(2)        visiting = {3}
<- done(3)          visiting = {}
```

Memoization step (`preMap[crs] = []`) marks `crs` as resolved so later DFS calls short-circuit.

