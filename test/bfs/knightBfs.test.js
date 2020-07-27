const knightBfs = require('../../src/bfs/knightBfs').default;

describe('knightBfs', () => {
  it('should return 4 4 2 8 for (1, 1)', async () => {
    expect(knightBfs(5)).toEqual([
      [4, 4, 2, 8],
      [4, 2, 4, 4],
      [2, 4, -1, -1],
      [8, 4, -1, 1],
    ]);
  });
});
