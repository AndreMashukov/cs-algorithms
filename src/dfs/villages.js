const Graph = require('../../src/shared/Graph/Graph').default;
const GraphVertex = require('../../src/shared/Graph/GraphVertex').default;
const GraphEdge = require('../../src/shared/Graph/GraphEdge').default;
const depthFirstSearch = require('./depthFirstSearch').default;

/**
 * Write a program that calculates how many possible
 * vacations you can consider,
 * i.e., how many pairs of days (A, B) satisfy the constraints
 * that you will visit all the villages you see during
 * your bus trips (visited villages numbers
 * create continuous range of integers).
 * @param {array} T - Road network between N villages,
 * @return {number} - returns your number of possible vacations.
 */
function possibleVacationsNumber(T) {
  const pairs = [];
  // let maxDays = T.length - 1;
  // Undirected graph
  const graph = new Graph(false);
  const vertexMap = new Map;
  T.forEach((Tval, index) => {
    vertexMap.set(index, new GraphVertex(`${index}`));
  });

  T.forEach((Tval, index) => {
    const edge = new GraphEdge(vertexMap.get(index),
        vertexMap.get(Tval));
    graph.addEdge(edge);
  });

  let currentStart = 0;

  const enterVertexCallback = (vertex) => {
    const current = parseInt(vertex.currentVertex.value, 0);
    // All paths are possible for vertex 0
    if (currentStart === 0) {
      pairs.push([0, current].sort((a, b) => a - b));
    }

    // Pairs with same values are allowed.
    if (currentStart === current) {
      pairs.push([current, current].sort((a, b) => a - b));
    }

    // Pairs with neighbor values are allowed
    // if the difference between them is 1
    if (vertex.previousVertex) {
      const previuos = parseInt(vertex.previousVertex.value, 0);
      if (Math.abs(current - previuos) === 1) {
        pairs.push([current, previuos].sort((a, b) => a - b));
      }
    }

    // console.log('currentVertex', vertex);
  };

  vertexMap.forEach((value, key) => {
    currentStart = key;
    depthFirstSearch(graph, vertexMap.get(key), {
      enterVertex: enterVertexCallback,
    });
  });
  const uniquePairs = new Set(pairs.map((pair) =>
    `${pair[0]}_${pair[1]}`,
  ));

  // console.log('pairs', uniquePairs);
  return uniquePairs.size;
}

exports.default = possibleVacationsNumber;

//     2 - 3
//     |
// 1 - 0 - 5
// |
// 4
