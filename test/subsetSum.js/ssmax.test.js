const ssmax = require('../../src/subsetSum/ssmax');

describe('subsetSumMax', () => {
  it('should return [11, 7, 1]', async () => {
    expect(ssmax.subsetSumMax([1, 2, 3, 5, 7, 9, 11], 19)).toStrictEqual([
      11,
      7,
      1,
    ]);
  });
});
