/**
 * It should return an integer that represents
 * the number of valid pairs that can be formed.
 * @param {number} n - number.
 * @param {array} astronaut - list of pairs of astronaut ID's.
 * @return {number} - number of ways to choose a pair of astronauts
 *  from different coutries..
 */
function journeyDfs(n, astronaut) {
  const pairs = astronaut;
  const countryCounts = [];
  const visited = [];
  let totalVisited = 0;

  // add opposite edges to pairs
  astronaut.forEach((pair) => {
    pairs.push([pair[1], pair[0]]);
  });

  // launch DFS from first non-visited pair
  pairs.forEach((pair) => {
    if (!visited[pair[0]]) {
      const count = runDFS(pair[0]);
      // console.log(pair[0] + ' count is:  ' + count );
      countryCounts.push(count);
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
  // save for later

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

  /**
 * DFS function
 * @param {object} node - node.
 * @return {number} - count
 */
  function runDFS(node) {
    let count = 1;
    visited[node] = true;
    totalVisited ++;

    // get all value with this key
    const myEdges = pairs.filter((pair) => {
      return pair[0] === node;
    });

    myEdges.forEach((edge) => {
      if (!visited[edge[1]]) {
        count += runDFS(edge[1]);
      }
    });
    return count;
  }
}

module.exports.journeyDfs = journeyDfs;

// You will be given a list of pairs of astronaut ID's.
// Each pair is made of astronauts from the same country.
// Determine how many pairs of astronauts
// from different countries they can choose from.
