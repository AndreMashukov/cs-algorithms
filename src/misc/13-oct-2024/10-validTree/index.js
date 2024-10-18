class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @returns {boolean}
   */
  validTree (n, edges) {
    const adjacencyList = new Map() // Move adjacencyList into validTree function

    if (n === 1) return edges.length === 0

    if (edges.length === 0) return false

    // Populate the adjacency list with the given edges
    for (const edge of edges) {
      const node1 = edge[0]
      const node2 = edge[1]
      if (!adjacencyList.has(node1)) adjacencyList.set(node1, [])
      if (!adjacencyList.has(node2)) adjacencyList.set(node2, [])
      adjacencyList.get(node1).push(node2)
      adjacencyList.get(node2).push(node1)
    }

    const visited = new Set()

    // Closure function for DFS
    const dfs = (node, previous) => {
      if (visited.has(node)) return false // Cycle detected

      visited.add(node) // Mark the node as visited

      // Recursively visit all neighbors of the node
      for (const neighbor of adjacencyList.get(node)) {
        if (neighbor === previous) continue // Skip the previous node to avoid backtracking

        if (!dfs(neighbor, node)) return false // Cycle detected in neighbors
      }

      return true
    }

    // Start DFS from node 0 with -1 as the previous node
    if (!dfs(0, -1)) return false

    // Check if all nodes are visited to ensure the graph is connected
    return visited.size === n
  }
}

// union find, if union return false, loop exists,
// at end size must equal n, or its not connected;
// dfs to get size and check for loop, since each edge is double,
// before dfs on neighbor of N, remove N from neighbor list of neighbor;

// Cycle Detection with DFS:
// The algorithm uses Depth-First Search (DFS) to detect cycles in the graph.
// If a node is revisited during the DFS traversal,
// a cycle is detected, and the graph cannot be a valid tree.

// Connectivity Check:
// After the DFS traversal, the algorithm checks if all nodes have been visited.
// This ensures that the graph is fully connected.
// If the number of visited nodes is equal to n,
// the graph is connected; otherwise, it is not a valid tree.
