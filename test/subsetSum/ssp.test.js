const getSubsets = require('../../src/subsetSum/ssp').default;

describe('subsetSum', () => {
  it('should return [7, 2, 1, 7]', async () => {
    const sets = getSubsets([7, 2, 1, 5, 1, 20, 7], 17);
    expect(sets).toContainEqual([1, 2, 7, 7]);
  });

  it('should return [4, 5]', async () => {
    const sets = getSubsets([3, 34, 4, 12, 5, 2], 9);
    expect(sets).toContainEqual([4, 5]);
    expect(sets).toContainEqual([2, 3, 4]);
  });

  it('should return empty array', async () => {
    expect(getSubsets([3, 34, 4, 12, 5, 2], 30)).toEqual([]);
  });
});
