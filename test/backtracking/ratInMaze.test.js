const RatInMaze = require('../../src/backtracking/RatInMaze').default;

describe('RatInMaze', () => {
  it('should find the path', async () => {
    const matrix = [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1]
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
      [0, 0, 0, 1, 1]
    ];
    const ratInMaze = new RatInMaze(matrix.length);
    const result = ratInMaze.solveMaze(matrix, matrix.length);
    expect(result).toEqual(false);
  });
});

// A Maze is given as N*N binary matrix of blocks where source block is the upper left most block i.e.,
// maze[0][0] and destination block is lower rightmost block i.e.,
// maze[N-1][N-1]. A rat starts from source and has to reach the destination.
// The rat can move only in two directions: forward and down.

// In the maze matrix, 0 means the block is a dead end and 1 means
// the block can be used in the path from source to destination.
