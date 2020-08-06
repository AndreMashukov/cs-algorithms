const possibleVacationsNumber = require('../../src/dfs/villages').default;

describe('Villages', () => {
  it('should return 12 for set [2, 0, 2, 2, 1, 0]', async () => {
    expect(possibleVacationsNumber([2, 0, 2, 2, 1, 0])).toEqual(12);
  });
});

//     2 - 3
//     |
// 1 - 0 - 5
// |
// 4

// A < B < 6
