const Graph = require('../../src/shared/Graph/Graph').default;
const GraphVertex = require('../../src/shared/Graph/GraphVertex').default;
const GraphEdge = require('../../src/shared/Graph/GraphEdge').default;
const depthFirstSearch = require('./depthFirstSearch').default;
/**
 * It should return an integer that represents
 * the number of valid pairs that can be formed.
 * @param {number} n - number.
 * @param {array} astronaut - list of pairs of astronaut ID's.
 * @return {number} - number of ways to choose a pair of astronauts
 *  from different coutries..
 */
function journeyDfs(n, astronaut) {
  const graph = new Graph(true);
  const vertexMap = new Map;
  const visitedArray = [];
  const pairs = astronaut;
  const countryCounts = [];
  let totalVisited = 0;
  let count = 0;

  // add opposite edges to pairs
  // (it's because the graph is undirected)
  astronaut.forEach((pair) => {
    pairs.push([pair[1], pair[0]]); // !
    vertexMap.set(pair[0], new GraphVertex(`${pair[0]}`));
    vertexMap.set(pair[1], new GraphVertex(`${pair[1]}`));
  });

  pairs.forEach((pair) => {
    const edge = new GraphEdge(vertexMap.get(pair[0]),
        vertexMap.get(pair[1]));
    graph.addEdge(edge);
  });

  const enterVertexCallback = (vertex) => {
    const value = parseInt(vertex.currentVertex.value, 0);
    visitedArray.push(value);
    count++;
    totalVisited++;
  };

  vertexMap.forEach((value, key) => {
    if (!visitedArray.includes(key)) {
      count = 0;
      depthFirstSearch(graph, vertexMap.get(key), {
        enterVertex: enterVertexCallback,
      });
      countryCounts.push(count-1);
      totalVisited--;
    }
  });

  // console.log('Done with pairs, countryCounts is: '+countryCounts);

  // multiply countryCounts in one loop instead of two
  let sum = 0;
  let multiplier = 0;
  for (let j=0; j < countryCounts.length; j++) {
    sum += multiplier * countryCounts[j];
    multiplier += countryCounts[j];
  }

  // console.log('Total Country pairs is '+sum);

  const singles = n - totalVisited;
  // console.log('Num singles is ' + singles);

  const sumOfCountryCounts = multiplier;

  const localSinglesPairs =
    ((singles*(singles+1))/2)-singles;
    // factorial

  // console.log('Singles local pairs '+localSinglesPairs);

  const singlesToAdd = (sumOfCountryCounts * singles) +
    localSinglesPairs;

  // console.log('And Total singles contrib is  '+singlesToAdd);

  const totalPairs = sum + singlesToAdd;

  // console.log('The final TOTAL is  '+totalPairs);
  return totalPairs;
}

module.exports.journeyDfs = journeyDfs;

// You will be given a list of pairs of astronaut ID's.
// Each pair is made of astronauts from the same country.
// Determine how many pairs of astronauts
// from different countries they can choose from.
