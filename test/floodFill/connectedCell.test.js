const connectedCell = require('../../src/floodFill/connectedCells').default;

describe('DFS: connectedCell', () => {
  it('should return 5', async () => {
    expect(connectedCell([
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 0],
    ])).toEqual(5);
  });

  it('should return 5', async () => {
    expect(connectedCell([
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 0],
    ])).toEqual(4);
  });

  it('should return 5', async () => {
    expect(connectedCell([
      [1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 1],
    ])).toEqual(5);
  });
});
