const lip = require('../../src/lip/longestIncreasingPath');

describe('longestIncreasingPath', () => {
  it('should find the length of the longest increasing path', () => {
    // The longest increasing path
    // is [1, 2, 6, 9]
    expect(lip.longestIncreasingPath([
      [9, 9, 4],
      [6, 6, 8],
      [2, 1, 1],
    ])).toBe(4);

    expect(lip.longestIncreasingPath([
      [9, 10, 11],
      [6, 6, 8],
      [2, 1, 1],
    ])).toBe(6);
  });
});
