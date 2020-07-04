const ssp = require('../../src/subsetSum/ssp');

describe('subsetSum', () => {
  it('should return [7, 2, 1, 7]', async () => {
    expect(ssp.getSubsets([7, 2, 1, 5, 1, 20, 7], 17)).toContainEqual([
      7,
      2,
      1,
      7,
    ]);
  });

  it('should return [4, 5]', async () => {
    expect(ssp.getSubsets([3, 34, 4, 12, 5, 2], 9)).toContainEqual([
      4,
      5,
    ]);
  });

  it('should return empty array', async () => {
    expect(ssp.getSubsets([3, 34, 4, 12, 5, 2], 30)).toEqual([]);
  });
});
