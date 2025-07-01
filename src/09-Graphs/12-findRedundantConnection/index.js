class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @returns {number}
   */
  findRedundantConnection (edges) {
    const parent = new Array(edges.length + 1).fill(0).map((_, i) => i)
    const rank = new Array(edges.length + 1).fill(1)

    // Find function to find the root of a node
    const find = (node) => {
      let result = node
      while (parent[result] !== result) {
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
        return false
      }

      // Union by rank
      if (rank[p2] > rank[p1]) {
        parent[p1] = p2
        rank[p2] += rank[p1]
      } else {
        parent[p2] = p1
        rank[p1] += rank[p2]
      }

      return true
    }

    for (const [n1, n2] of edges) {
      if (!union(n1, n2)) {
        return [n1, n2]
      }
    }

    return []
  }
}
