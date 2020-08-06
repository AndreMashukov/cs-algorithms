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
  const visitedArray = [];
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

  console.log(graph);

  const enterVertexCallback = (vertex) => {
    const value = parseInt(vertex.currentVertex.value, 0);
    visitedArray.push(value);
    console.log('enterVertexCallback', value);
  };

  depthFirstSearch(graph, vertexMap.get(0), {
    enterVertex: enterVertexCallback,
  });

  console.log('visitedArray', visitedArray);

  return 12;
}

exports.default = possibleVacationsNumber;

//     2 - 3
//     |
// 1 - 0 - 5
// |
// 4
