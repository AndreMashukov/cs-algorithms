const minimumMoves = require('../../src/dfs/castle').default;

describe('DFS: Castle', () => {
  it('should return 3', async () => {
    expect(minimumMoves([
      '.X.',
      '.X.',
      '...',
    ], 0, 0, 0, 2)).toEqual(3);
  });

  it('should return 2', async () => {
    expect(minimumMoves([
      '...',
      '.X.',
      '.X.',
    ], 2, 0, 0, 2)).toEqual(2);
  });
});

// Sample Input
// 3
// .X.
// .X.
// ...
// 0 0 0 2
// Sample Output
// 3
// Explanation
// Here is a path that one could follow in order to reach
// the destination in 3 steps:
// (0, 0) -> (2, 0) -> (2, 2) -> (0, 2)
