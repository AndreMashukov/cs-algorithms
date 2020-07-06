const ast = require('../../src/dfs/astronauts');
// For example, we have the following data
// on 2 pairs of astronauts, and 4 astronauts total,
// numbered 0 through 3.
// 1   2
// 2   3
// Astronauts by country are [0]  and [1,2,3].
// There are 3 pairs to choose
// from: [0,1], [0,2] and [0,3].
describe('DFS astraunauts', () => {
  it('should return 3 for set [1 , 2], [2, 3]', async () => {
    // n = 4 the number of astronauts and
    // the number of pairs = 2.
    expect(
        ast.journeyDfs(4, [
          [1, 3],
          [2, 3],
        ]),
    ).toEqual(3);
  });

  it('should return 6', async () => {
    // n = 5 the number of astronauts and
    // the number of pairs = 3.
    expect(
        ast.journeyDfs(5, [
          [0, 1],
          [2, 3],
          [0, 4],
        ]),
    ).toEqual(6);
  });

  it('should return 23', async () => {
    // n = 10 the number of astronauts and
    // the number of pairs = 7.
    expect(
        ast.journeyDfs(10, [
          [0, 2],
          [1, 8],
          [1, 4],
          [2, 8],
          [2, 6],
          [3, 5],
          [6, 9],
        ]),
    ).toEqual(23);
  });
});

// Example:

// 10 7
// ---
// 0 2
// 1 8
// 1 4
// 2 8
// 2 6
// 3 5
// 6 9

// Graph:

// 0 ---- 2 ---- 6     3     7
//        |      |     |
//        |      |     |
// 1 ---- 8      9     5
// |
// |
// 4

// 3 sets {0,1,2,4,6,8,9} {3,5} {7}.
// DFS from 0 returns "7".
// answer = 0.
// DFS from 1 should not start
//     [since we have vistied 1 while dfs(0)].
// DFS from 2 should not start ...
// DFS from 3 returns "2".
// answer = 7 * 2 = 14.
// DFS from 7 returns "1".
// answer = 14 + (7+2)*1.
// answer = 23.'

// Output.
// 0 count is:  7
// 3 count is:  2
// Done with pairs, countryCounts is: 7,2
// Total Country pairs is 14
// Num singles is 1
// Singles local pairs 0
// And Total singles contrib is  9
