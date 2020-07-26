const findSets = require('../../src/sets/uniqueSubsets').default;

describe('All unique subsets with a given sum', () => {
  it('should return unique sets', () => {
    expect(findSets([1, 2, 3, 4, 5, 6], 6)).toStrictEqual([
      [1, 2, 3],
      [1, 5],
      [2, 4],
      [6],
    ]);

    expect(findSets([6, 2, 7, 8, 2, 4, 1, 3, 7, 5], 8)).toStrictEqual([
      [1, 2, 2, 3],
      [1, 2, 5],
      [1, 3, 4],
      [1, 7],
      [2, 2, 4],
      [2, 6],
      [3, 5],
      [8],
    ]);
  });
});
