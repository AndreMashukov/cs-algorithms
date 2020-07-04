const ssmax = require('../../src/subsetSum/ssmax');

describe('subsetSumMax', () => {
  it('should return [7, 2, 1, 7]', async () => {
    expect(ssmax.subsetSumMax([1, 2, 3, 5, 7, 9, 11], 19)).toContainEqual([
      1,
      7,
      11,
    ]);
  });
});
