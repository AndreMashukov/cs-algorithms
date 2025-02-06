// There is an undirected graph with n nodes.
// There is also an edges array, where edges[i] = [a, b] means
// that there is an edge between node a and node b in the graph.

// The nodes are numbered from 0 to n - 1.
// Return the total number of connected components in that graph.

class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @returns {number}
   */
  countComponents (n, edges) {
    const parent = new Array(n)
    const rank = new Array(n)

    // Initialize parent and rank arrays
    for (let i = 0; i < n; i++) {
      parent[i] = i // parent[i] points to itself
      rank[i] = 1
    }

    // Find function to find the root of a node
    const find = (node) => {
      let result = node
      while (parent[result] !== result) { // until we reach the root
        parent[result] = parent[parent[result]] // Path compression
        result = parent[result]
      }
      return result
    }

    // Union function to unite two sets
    const union = (n1, n2) => {
      const p1 = find(n1)
      const p2 = find(n2)

      if (p1 === p2) {
        return 0 // They are already in the same set
      }

      // Union by rank
      if (rank[p2] > rank[p1]) {
        parent[p1] = p2
        rank[p2] += rank[p1]
      } else {
        parent[p2] = p1
        rank[p1] += rank[p2]
      }

      return 1
    }

    let result = n
    for (const [n1, n2] of edges) {
      if (union(n1, n2) === 1) {
        result-- // Reduce the number of components
      }
    }

    return result
  }
}

console.log(new Solution().countComponents(5, [[0, 1], [1, 2], [3, 4]])) // Expected output: 2

// Union-Find Data Structure:
// The algorithm uses the Union-Find data structure to efficiently manage
// and merge disjoint sets.
//  This helps in determining whether two nodes are in the same connected component
//  and in merging components when an edge is added.

// Path Compression and Union by Rank:
// Path Compression:
//  During the find operation,
// the algorithm flattens the structure of the tree, ensuring
// that each node points directly to the root.
// This speeds up future operations.

// Union by Rank:
// During the union operation, the algorithm attaches
// the smaller tree under the root of the larger tree,
// keeping the tree as flat as possible.
//  This helps in maintaining efficient operations.
