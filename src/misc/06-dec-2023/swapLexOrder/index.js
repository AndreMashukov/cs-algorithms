// Given a string str and array of pairs that indicates which indices in the string can be swapped, return the lexicographically largest string that results from doing the allowed swaps. You can swap indices any number of times.

// Example

// For str = "abdc" and pairs = [[1, 4], [3, 4]], the output should be
// solution(str, pairs) = "dbca".

// Basic idea: the sets of letters that can swap with
//  each other form a decomposition of the string.
// Since letters that cannot swap belong to unique pieces,
//  they will always go back to their starting position.
// Otherwise, we put pieces back in their sorted order.
//
// The complexity of this algorithm is O(n log n + m) worst case,
//  where n is the length of str and m is the length of pairs.

function solution (str, pairs) {
  // The given pairs are transformed into an edge list (graph)
  // where each character index is a node,
  // and pairs represent edges between nodes.
  // This is achieved by iterating through the pairs and adding edges to the graph.
  // Turn pairs into edge lists: O(n+m)
  const graph = new Array(str.length).fill(0).map((e) => [])
  for (const pair of pairs) {
    graph[pair[0] - 1].push(pair[1] - 1)
    graph[pair[1] - 1].push(pair[0] - 1)
  }
  // { '0': [ 3 ], '2': [ 3 ], '3': [ 0, 2 ] }
  //  [ [ 3 ], [], [ 3 ], [ 0, 2 ] ]
  // console.log(graph)

  // Identify Connected Components (CCs) with Depth-First Search (DFS):
  // Depth-First Search is used to identify connected components in the graph.
  // Each connected component is assigned a unique identifier (ccnum).
  // The ccs array is used to keep track of which connected component
  // each character belongs to.
  // DFS to Identify Connected Components:
  //   - The code uses a **`for...in`** loop to iterate over
  //       each character **`c`** in the input string **`str`**.
  //   - If **`ccs[c]`** is truthy, it means that the character
  //      **`c`** has already been assigned to a connected component,
  //      and we can skip it. This check helps to avoid redundant computations for characters that have already been processed.
  //  - If **`ccs[c]`** is falsy, it means that the character **`c`** has not been assigned to any connected component. In this case:
  const ccs = []
  let ccnum = 0
  for (const c in str) {
    // console.log({ c })
    //  { c: '1'...'3' }
    if (ccs[c]) {
      continue
    }
    ccs[c] = ++ccnum
    const dfs = [...graph[c]]
    while (dfs.length) {
      const d = dfs.shift()
      if (ccs[d]) {
        continue
      }
      ccs[d] = ccnum
      dfs.push(...graph[d])
    }
  }
  // Group words by ccs: O(n)
  const ccWords = new Array(ccnum).fill(0).map((e) => [])
  for (const c in str) {
    ccWords[ccs[c] - 1].push(str[c])
  }

  // Sort all words: O(n log n)
  ccWords.map((e) => e.sort())

  // Build the new string: O(n)
  let output = ''
  for (const c in str) {
    output += ccWords[ccs[c] - 1].pop()
  }
  return output
}

module.exports = solution
