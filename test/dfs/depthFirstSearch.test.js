const Graph = require('../../src/shared/Graph/Graph').default;
const grv = require('../../src/shared/Graph/GraphVertex');
const gre = require('../../src/shared/Graph/GraphEdge');
const dfs = require('../../src/dfs/depthFirstSearch');

describe('depthFirstSearch', () => {
  it('should perform DFS operation on graph', () => {
    const graph = new Graph(true);

    const vertexA = new grv.GraphVertex('A');
    const vertexB = new grv.GraphVertex('B');
    const vertexC = new grv.GraphVertex('C');
    const vertexD = new grv.GraphVertex('D');
    const vertexE = new grv.GraphVertex('E');
    const vertexF = new grv.GraphVertex('F');
    const vertexG = new grv.GraphVertex('G');

    const edgeAB = new gre.GraphEdge(vertexA, vertexB);
    const edgeBC = new gre.GraphEdge(vertexB, vertexC);
    const edgeCG = new gre.GraphEdge(vertexC, vertexG);
    const edgeAD = new gre.GraphEdge(vertexA, vertexD);
    const edgeAE = new gre.GraphEdge(vertexA, vertexE);
    const edgeEF = new gre.GraphEdge(vertexE, vertexF);
    const edgeFD = new gre.GraphEdge(vertexF, vertexD);
    const edgeDG = new gre.GraphEdge(vertexD, vertexG);

    graph
        .addEdge(edgeAB)
        .addEdge(edgeBC)
        .addEdge(edgeCG)
        .addEdge(edgeAD)
        .addEdge(edgeAE)
        .addEdge(edgeEF)
        .addEdge(edgeFD)
        .addEdge(edgeDG);

    expect(graph.toString()).toBe('A,B,C,G,D,E,F');

    const enterVertexCallback = jest.fn();
    const leaveVertexCallback = jest.fn();

    // Traverse graphs without callbacks first to check default ones.
    dfs.depthFirstSearch(graph, vertexA);

    // Traverse graph with enterVertex and leaveVertex callbacks.
    dfs.depthFirstSearch(graph, vertexA, {
      enterVertex: enterVertexCallback,
      leaveVertex: leaveVertexCallback,
    });

    expect(enterVertexCallback).toHaveBeenCalledTimes(
        graph.getAllVertices().length);
    expect(leaveVertexCallback).toHaveBeenCalledTimes(
        graph.getAllVertices().length);

    const enterVertexParamsMap = [
      {currentVertex: vertexA, previousVertex: null},
      {currentVertex: vertexB, previousVertex: vertexA},
      {currentVertex: vertexC, previousVertex: vertexB},
      {currentVertex: vertexG, previousVertex: vertexC},
      {currentVertex: vertexD, previousVertex: vertexA},
      {currentVertex: vertexE, previousVertex: vertexA},
      {currentVertex: vertexF, previousVertex: vertexE},
    ];

    for (let callIndex = 0; callIndex < graph.getAllVertices().length;
      callIndex += 1) {
      const params = enterVertexCallback.mock.calls[callIndex][0];
      expect(params.currentVertex).toEqual(enterVertexParamsMap[callIndex]
          .currentVertex);
      expect(params.previousVertex).toEqual(enterVertexParamsMap[callIndex]
          .previousVertex);
    }

    const leaveVertexParamsMap = [
      {currentVertex: vertexG, previousVertex: vertexC},
      {currentVertex: vertexC, previousVertex: vertexB},
      {currentVertex: vertexB, previousVertex: vertexA},
      {currentVertex: vertexD, previousVertex: vertexA},
      {currentVertex: vertexF, previousVertex: vertexE},
      {currentVertex: vertexE, previousVertex: vertexA},
      {currentVertex: vertexA, previousVertex: null},
    ];

    for (let callIndex = 0; callIndex < graph.getAllVertices().length;
      callIndex += 1) {
      const params = leaveVertexCallback.mock.calls[callIndex][0];
      expect(params.currentVertex).toEqual(leaveVertexParamsMap[callIndex]
          .currentVertex);
      expect(params.previousVertex).toEqual(leaveVertexParamsMap[callIndex]
          .previousVertex);
    }
  });

  it('allow users to redefine vertex visiting logic', () => {
    const graph = new Graph(true);

    const vertexA = new grv.GraphVertex('A');
    const vertexB = new grv.GraphVertex('B');
    const vertexC = new grv.GraphVertex('C');
    const vertexD = new grv.GraphVertex('D');
    const vertexE = new grv.GraphVertex('E');
    const vertexF = new grv.GraphVertex('F');
    const vertexG = new grv.GraphVertex('G');

    const edgeAB = new gre.GraphEdge(vertexA, vertexB);
    const edgeBC = new gre.GraphEdge(vertexB, vertexC);
    const edgeCG = new gre.GraphEdge(vertexC, vertexG);
    const edgeAD = new gre.GraphEdge(vertexA, vertexD);
    const edgeAE = new gre.GraphEdge(vertexA, vertexE);
    const edgeEF = new gre.GraphEdge(vertexE, vertexF);
    const edgeFD = new gre.GraphEdge(vertexF, vertexD);
    const edgeDG = new gre.GraphEdge(vertexD, vertexG);

    graph
        .addEdge(edgeAB)
        .addEdge(edgeBC)
        .addEdge(edgeCG)
        .addEdge(edgeAD)
        .addEdge(edgeAE)
        .addEdge(edgeEF)
        .addEdge(edgeFD)
        .addEdge(edgeDG);

    expect(graph.toString()).toBe('A,B,C,G,D,E,F');

    const enterVertexCallback = jest.fn();
    const leaveVertexCallback = jest.fn();

    dfs.depthFirstSearch(graph, vertexA, {
      enterVertex: enterVertexCallback,
      leaveVertex: leaveVertexCallback,
      allowTraversal: ({currentVertex, nextVertex}) => {
        return !(currentVertex === vertexA && nextVertex === vertexB);
      },
    });

    expect(enterVertexCallback).toHaveBeenCalledTimes(7);
    expect(leaveVertexCallback).toHaveBeenCalledTimes(7);

    const enterVertexParamsMap = [
      {currentVertex: vertexA, previousVertex: null},
      {currentVertex: vertexD, previousVertex: vertexA},
      {currentVertex: vertexG, previousVertex: vertexD},
      {currentVertex: vertexE, previousVertex: vertexA},
      {currentVertex: vertexF, previousVertex: vertexE},
      {currentVertex: vertexD, previousVertex: vertexF},
      {currentVertex: vertexG, previousVertex: vertexD},
    ];

    for (let callIndex = 0; callIndex < graph.getAllVertices().length;
      callIndex += 1) {
      const params = enterVertexCallback.mock.calls[callIndex][0];
      expect(params.currentVertex).toEqual(enterVertexParamsMap[callIndex]
          .currentVertex);
      expect(params.previousVertex).toEqual(enterVertexParamsMap[callIndex]
          .previousVertex);
    }

    const leaveVertexParamsMap = [
      {currentVertex: vertexG, previousVertex: vertexD},
      {currentVertex: vertexD, previousVertex: vertexA},
      {currentVertex: vertexG, previousVertex: vertexD},
      {currentVertex: vertexD, previousVertex: vertexF},
      {currentVertex: vertexF, previousVertex: vertexE},
      {currentVertex: vertexE, previousVertex: vertexA},
      {currentVertex: vertexA, previousVertex: null},
    ];

    for (let callIndex = 0; callIndex < graph.getAllVertices().length;
      callIndex += 1) {
      const params = leaveVertexCallback.mock.calls[callIndex][0];
      expect(params.currentVertex).toEqual(leaveVertexParamsMap[callIndex]
          .currentVertex);
      expect(params.previousVertex).toEqual(leaveVertexParamsMap[callIndex]
          .previousVertex);
    }
  });
});
