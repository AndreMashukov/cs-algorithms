const cwr = require('../../src/sets/combWithRep');

describe('combineWithRepetitions', () => {
  it('should combine string with repetitions', () => {
    expect(cwr.combineWithRepetitions(['A'], 1)).toEqual([
      ['A'],
    ]);

    expect(cwr.combineWithRepetitions(['A', 'B'], 1)).toEqual([
      ['A'],
      ['B'],
    ]);

    expect(cwr.combineWithRepetitions(['A', 'B'], 2)).toEqual([
      ['A', 'A'],
      ['A', 'B'],
      ['B', 'B'],
    ]);

    expect(cwr.combineWithRepetitions(['A', 'B'], 3)).toEqual([
      ['A', 'A', 'A'],
      ['A', 'A', 'B'],
      ['A', 'B', 'B'],
      ['B', 'B', 'B'],
    ]);

    expect(cwr.combineWithRepetitions(['A', 'B', 'C'], 2)).toEqual([
      ['A', 'A'],
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'B'],
      ['B', 'C'],
      ['C', 'C'],
    ]);

    expect(cwr.combineWithRepetitions(['A', 'B', 'C'], 3)).toEqual([
      ['A', 'A', 'A'],
      ['A', 'A', 'B'],
      ['A', 'A', 'C'],
      ['A', 'B', 'B'],
      ['A', 'B', 'C'],
      ['A', 'C', 'C'],
      ['B', 'B', 'B'],
      ['B', 'B', 'C'],
      ['B', 'C', 'C'],
      ['C', 'C', 'C'],
    ]);
  });
});
