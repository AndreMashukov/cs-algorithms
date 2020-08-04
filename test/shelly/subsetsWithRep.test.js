const findSets = require('../../src/shelley/subsetsWithRep').default;

describe('Unique subsets with repeating digits', () => {
  it('should return 3 subsets', async () => {
    const target = 6;
    const arr = [2, 4, 3];

    expect(findSets(arr, target).result.length).toEqual(3);
  });

  it('should return 4 subsets', async () => {
    const target = 8;
    const arr = [2, 6, 3, 5];

    expect(findSets(arr, target).result.length).toEqual(4);
  });
});
