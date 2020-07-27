const WordMatrix = require('../../src/backtracking/WordMatrix').default;

describe('WordMatrix', () => {
  it('should return result for the word "horizon"', async () => {
    const matrix = [
      ['t', 'z', 'x', 'c', 'd'],
      ['a', 'h', 'n', 'z', 'x'],
      ['h', 'w', 'o', 'i', 'o'],
      ['o', 'r', 'n', 'r', 'n'],
      ['a', 'b', 'r', 'i', 'n'],
    ];
    const wordMatrix = new WordMatrix(matrix.length);
    const result = wordMatrix.searchWord(matrix, 'horizon');
    expect(result).toEqual(true);
    expect(wordMatrix.getSolution()).toStrictEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 0, 5, 0],
      [0, 0, 2, 4, 6],
      [0, 0, 0, 3, 7],
      [0, 0, 0, 0, 0],
    ]);
  });
});
