const lw = require('../../src/lowri/lowri');
const gr = require('../../src/shared/Graph');

describe('lowri', () => {
  it('should return shortest path from each vertex', () => {
    const graph = new gr.Graph();
    graph.addVertex('S', {V: 1, W: 4});
    graph.addVertex('V', {W: 2, T: 6});
    graph.addVertex('W', {T: 3});
    graph.addVertex('T');
    expect(lw.lowri(graph, 'S')).toStrictEqual({S: 0, V: 1, W: 3, T: 6});
  });
});
