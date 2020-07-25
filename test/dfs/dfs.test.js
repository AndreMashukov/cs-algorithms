const Graph = require('../../src/shared/Graph/Graph').default;
const GraphVertex = require('../../src/shared/Graph/GraphVertex').default;
const GraphEdge = require('../../src/shared/Graph/GraphEdge').default;
const depthFirstSearch = require('../../src/dfs/depthFirstSearch').default;

describe('depthFirstSearch', () => {
  it('allow users to redefine vertex visiting logic', () => {
    const graph = new Graph(true);

    const vertex0 = new GraphVertex('0');
    const vertex1 = new GraphVertex('1');
    const vertex2 = new GraphVertex('2');
    const vertex3 = new GraphVertex('3');
    const vertex4 = new GraphVertex('4');
    const vertex5 = new GraphVertex('5');
    const vertex6 = new GraphVertex('6');
    // const vertex7 = new GraphVertex('7');
    const vertex8 = new GraphVertex('8');
    const vertex9 = new GraphVertex('9');

    const edge02 = new GraphEdge(vertex0, vertex2);
    const edge28 = new GraphEdge(vertex2, vertex8);
    const edge81 = new GraphEdge(vertex8, vertex1);
    const edge14 = new GraphEdge(vertex1, vertex4);
    const edge26 = new GraphEdge(vertex2, vertex6);
    const edge69 = new GraphEdge(vertex6, vertex9);
    const edge35 = new GraphEdge(vertex3, vertex5);

    graph
        .addEdge(edge02)
        .addEdge(edge28)
        .addEdge(edge81)
        .addEdge(edge14)
        .addEdge(edge26)
        .addEdge(edge69)
        .addEdge(edge35);

    expect(graph.toString()).toBe('0,1,2,3,4,5,6,8,9');
    const enterVertexCallback = jest.fn();
    const leaveVertexCallback = jest.fn();

    depthFirstSearch(graph, vertex0, {
      enterVertex: enterVertexCallback,
      leaveVertex: leaveVertexCallback,
      // allowTraversal: ({currentVertex, nextVertex}) => {
      //   return !(currentVertex === vertex0 && nextVertex === vertex2);
      // },
    });

    expect(enterVertexCallback).toHaveBeenCalledTimes(7);
    expect(leaveVertexCallback).toHaveBeenCalledTimes(7);
  });
});

// Graph:
// 0 ---- 2 ---- 6     3     7
//        |      |     |
//        |      |     |
// 1 ---- 8      9     5
// |
// |
// 4
