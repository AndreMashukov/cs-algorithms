const RatInMaze = require('../../src/backtracking/RatInMaze').default;

describe('RatInMaze', () => {
  it('should find the path', async () => {
    const matrix = [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1],
    ];
    const ratInMaze = new RatInMaze(matrix.length);
    const result = ratInMaze.solveMaze(matrix, matrix.length);
    expect(result).toEqual(true);
    // expect(ratInMaze.getSolution()).toStrictEqual([
    //   [1, 0, 1, 1, 1],
    //   [1, 1, 1, 0, 1],
    //   [0, 0, 0, 1, 1],
    //   [0, 0, 0, 1, 0],
    //   [0, 0, 0, 1, 1],
    // ]);
  });

  it('should NOT find the path', async () => {
    const matrix = [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1],
    ];
    const ratInMaze = new RatInMaze(matrix.length);
    const result = ratInMaze.solveMaze(matrix, matrix.length);
    expect(result).toEqual(false);
  });
});
