class Solution {
  /**
   * @param {number} n
   * @param {number[][]} edges
   * @returns {boolean}
   */
  validTree(n, edges) {
      const adj = new Map();
      if (n === 1) {
          return edges.length === 0;
      }

      for (let [n1, n2] of edges) {
          if (!adj.has(n1)) {
              adj.set(n1, [])
          }
          if (!adj.has(n2)) {
              adj.set(n2, []);
          }

          adj.get(n1).push(n2);
          adj.get(n2).push(n1)
      }

      // console.log(adj)
      const visit = new Set();

      const dfs = (node, prev) => {
          if (visit.has(node)) {
              return false;
          }

          visit.add(node)
          for (let nei of adj.get(node) || []) {
              if (nei === prev) {
                  continue
              }
              if (!dfs(nei, node)) {
                  return false
              }
          }

          return true
      }

      if (!dfs(0, -1)) {
          return false
      }

      return true
  }
}
