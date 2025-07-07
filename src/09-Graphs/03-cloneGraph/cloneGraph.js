// Given a node in a connected undirected graph, return a deep copy of the graph.

// Definition for a Node.
class Node {
  constructor (val = 0, neighbors = []) {
    this.val = val
    this.neighbors = neighbors
  }
}

class Solution {
  /**
   * @param {Node} node
   * @return {Node}
   */
  cloneGraph (node) {
    // Map to store the mapping from original nodes to their copies
    const oldToNew = new Map()
    // Start the DFS traversal to clone the graph
    return this.dfs(node, oldToNew)
  }

  /**
   * @param {Node} node
   * @param {Map} oldToNew
   * @return {Node}
   */
  dfs (node, oldToNew) {
    // Base case: if the node is null, return null
    if (node === null) {
      return null
    }

    // If the node has already been copied, return the copy
    if (oldToNew.has(node)) {
      return oldToNew.get(node)
    }

    // Create a copy of the current node
    const copy = new Node(node.val)
    // Store the copy in the map
    oldToNew.set(node, copy)

    // Recursively clone all the neighbors
    for (const nei of node.neighbors) {
      copy.neighbors.push(this.dfs(nei, oldToNew))
    }

    // Return the copy of the current node
    return copy
  }
}

// Example usage
console.log(new Solution().cloneGraph(new Node(1, [new Node(2), new Node(3)])))

// recursive dfs, hashmap for visited nodes
// If a node is null, return null.
// If a node has already been copied, return the copy from the map.
// Create a copy of the current node and store it in the map.
// Recursively clone all neighbors and add them to the neighbors list of the copy.

// 1: [2, 3]
// 2: [1, 4]
// 3: [1, 4]
// 4: [2, 3]
// We are given a very first node
