const findSets = require('../../src/shelley/subsetsWithRep').default;

describe('Unique subsets with repeating digits', () => {
  it('should return 3 subsets', async () => {
    const target = 6;
    const arr = [2, 4, 3];
    const sets = findSets(arr, target);

    expect(sets.result.length).toEqual(3);
    expect(sets.result).toContainEqual([2, 2, 2]);
    expect(sets.result).toContainEqual([2, 4]);
    expect(sets.result).toContainEqual([3, 3]);
  });

  it('should return 4 subsets', async () => {
    const target = 8;
    const arr = [2, 6, 3, 5];

    expect(findSets(arr, target).result.length).toEqual(4);
  });
});
