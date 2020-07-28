const fs = require('fs');
const minimumMoves = require('../../src/dfs/castle').default;

describe('DFS: Castle', () => {
  it('should return 3', async () => {
    expect(minimumMoves(['.X.', '.X.', '...'], 0, 0, 0, 2)).toEqual(3);
  });

  it('should return 2', async () => {
    expect(minimumMoves(['...', '.X.', '.X.'], 2, 0, 0, 2)).toEqual(2);
  });

  it('should return 10', async () => {
    const input = [];
    fs.readFileSync(__dirname + '/input/castle1.txt', 'utf-8')
        .split(/\r?\n/)
        .forEach((line) => {
          input.push(line);
        });

    expect(minimumMoves(input, 34, 28, 16, 8)).toEqual(9);
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
