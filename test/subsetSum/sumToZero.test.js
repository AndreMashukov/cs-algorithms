const getSubsets = require('../../src/subsetSum/sumToZero').default;

describe('How many ways to choose fragment with given sum', () => {
  it('should return 3', async () => {
    const sets = getSubsets([3, 1, -4, 2, 0], 0);
    expect(sets.length).toEqual(3);
  });

  it('should return 3', async () => {
    const sets = getSubsets([8, 3, 5, 1, -4, -8], 0);
    expect(sets.length).toEqual(4);
  });
});
