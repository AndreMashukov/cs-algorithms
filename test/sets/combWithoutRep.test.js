const cwr = require('../../src/sets/combWithoutRep');

describe('combineWithoutRepetitions', () => {
  it('should combine string without repetitions', () => {
    expect(cwr.combineWithoutRepetitions(['A', 'B'], 3)).toEqual([]);

    expect(cwr.combineWithoutRepetitions(['A', 'B'], 1)).toEqual([
      ['A'],
      ['B'],
    ]);

    expect(cwr.combineWithoutRepetitions(['A'], 1)).toEqual([
      ['A'],
    ]);

    expect(cwr.combineWithoutRepetitions(['A', 'B'], 2)).toEqual([
      ['A', 'B'],
    ]);

    expect(cwr.combineWithoutRepetitions(['A', 'B', 'C'], 2)).toEqual([
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'C'],
    ]);

    expect(cwr.combineWithoutRepetitions(['A', 'B', 'C'], 3)).toEqual([
      ['A', 'B', 'C'],
    ]);

    expect(cwr.combineWithoutRepetitions(['A', 'B', 'C', 'D'], 3)).toEqual([
      ['A', 'B', 'C'],
      ['A', 'B', 'D'],
      ['A', 'C', 'D'],
      ['B', 'C', 'D'],
    ]);

    expect(cwr.combineWithoutRepetitions(['A', 'B', 'C', 'D', 'E'], 3))
        .toEqual([
          ['A', 'B', 'C'],
          ['A', 'B', 'D'],
          ['A', 'B', 'E'],
          ['A', 'C', 'D'],
          ['A', 'C', 'E'],
          ['A', 'D', 'E'],
          ['B', 'C', 'D'],
          ['B', 'C', 'E'],
          ['B', 'D', 'E'],
          ['C', 'D', 'E'],
        ]);
  });
});
