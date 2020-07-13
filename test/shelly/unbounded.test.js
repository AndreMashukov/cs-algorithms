const unb = require('../../src/shelley/unbounded');

describe('Unbounded Knapsack problem', () => {
  it('should return 12', async () => {
    const target = 12;
    const arr = [1, 6, 9];

    expect(unb.unboundedKnapsack(target, arr)).toEqual(12);
  });

  it('should return 9', async () => {
    const target = 9;
    const arr = [3, 4, 4, 4, 8];

    expect(unb.unboundedKnapsack(target, arr)).toEqual(9);
  });

  // it('should return 13', async () => {
  //   const target = 13;
  //   const arr = [3, 7, 9, 11];

  //   expect(unb.unboundedKnapsack(target, arr)).toEqual(13);
  // });
});
