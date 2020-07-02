/** Class representing a graph. */
class Graph {
  /**
   * Create a graph.
   * @param {[]} vertices - vertices
   */
  constructor() {
    this.vertices = {};
  }

  /**
   * Add vertex to a graph.
   * @param {string} name - String.
   * @param {{}} edges - Edges.
   */
  addVertex(name, edges) {
    edges = edges || null;
    this.vertices[name] = edges;
  }
}

module.exports.Graph = Graph;
