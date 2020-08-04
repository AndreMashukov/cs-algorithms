const unb = require('../../src/shelley/unbounded');
const findSets = require('../../src/shelley/subsetsWithRep').default;

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

  it('should return 13', async () => {
    const target = 13;
    const arr = [3, 7, 9, 11];
    //  3+3+7 = 13
    expect(unb.unboundedKnapsack(target, arr)).toEqual(13);
  });

  it('should return 10', async () => {
    const target = 11;
    const arr = [3, 7, 9];
    expect(findSets(arr, target).closestSum).toEqual(10);
  });

  it('should return 13', async () => {
    const target = 13;
    const arr = [3, 7, 9, 11];
    expect(findSets(arr, target).closestSum).toEqual(13);
  });
});
