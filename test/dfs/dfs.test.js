const gr = require('../../src/shared/Graph/Graph');
const grv = require('../../src/shared/Graph/GraphVertex');
const gre = require('../../src/shared/Graph/GraphEdge');
const dfs = require('../../src/dfs/depthFirstSearch');

describe('depthFirstSearch', () => {
  it('allow users to redefine vertex visiting logic', () => {
    const graph = new gr.Graph(true);

    const vertex0 = new grv.GraphVertex('0');
    const vertex1 = new grv.GraphVertex('1');
    const vertex2 = new grv.GraphVertex('2');
    const vertex3 = new grv.GraphVertex('3');
    const vertex4 = new grv.GraphVertex('4');
    const vertex5 = new grv.GraphVertex('5');
    const vertex6 = new grv.GraphVertex('6');
    // const vertex7 = new grv.GraphVertex('7');
    const vertex8 = new grv.GraphVertex('8');
    const vertex9 = new grv.GraphVertex('9');

    const edge02 = new gre.GraphEdge(vertex0, vertex2);
    const edge28 = new gre.GraphEdge(vertex2, vertex8);
    const edge81 = new gre.GraphEdge(vertex8, vertex1);
    const edge14 = new gre.GraphEdge(vertex1, vertex4);
    const edge26 = new gre.GraphEdge(vertex2, vertex6);
    const edge69 = new gre.GraphEdge(vertex6, vertex9);
    const edge35 = new gre.GraphEdge(vertex3, vertex5);

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

    dfs.depthFirstSearch(graph, vertex0, {
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
