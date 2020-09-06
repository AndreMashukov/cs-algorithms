const getSubsets = require('../../src/subsetSum/average').default;

describe('How many ways to choose fragment with given mean', () => {
  it('should return 3', async () => {
    const sets = getSubsets([2, 1, 3], 2);
    expect(sets.length).toEqual(3);
  });

  it('should return 2', async () => {
    const sets = getSubsets([0, 4, 3, -1], 2);
    expect(sets.length).toEqual(2);
  });

  // it should be contiguous fragment
  // it('should return 0', async () => {
  //   const sets = getSubsets([2, 1, 4], 3);
  //   expect(sets.length).toEqual(0);
  // });
});
