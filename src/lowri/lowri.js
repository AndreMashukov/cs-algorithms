const pq = require('../shared/PriorityQueue');
const INFINITY = 1/0;
/**
 * Finding the shortest paths to graph nodes.
 * @param {Graph} graph - graph we're going to traverse.
 * @param {GraphVertex} startVertex - traversal start vertex.
 * @return {ShortestPaths}
 */
function lowri(graph, startVertex) {
  const nodes = new pq.PriorityQueue();
  const distances = {};
  const previous = {};

  for (vertex in graph.vertices) {
    if (graph.vertices.hasOwnProperty(vertex)) {
      if (vertex === startVertex) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      } else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }
      previous[vertex] = null;
    }
  }


  while (!nodes.isEmpty()) {
    const smallest = nodes.dequeue();
    for (const neighbor in graph.vertices[smallest]) {
      if (graph.vertices[smallest].hasOwnProperty(neighbor)) {
        const alt = distances[smallest] + graph.vertices[smallest][neighbor];

        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
        }
      }
    }
  }

  return distances;
}

module.exports.lowri = lowri;

