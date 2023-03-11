const { sumToPower } = require('../../../src/misc/june2022/sum-to-power');

describe('misc.june2022.sum-to-power', () => {
  it('should return 5', () => {
    const numOfPairs = sumToPower.naive([1, -1, 2, 3]);
    expect(numOfPairs).toEqual(5);
  });

  it('should return 1', () => {
    const numOfPairs = sumToPower.naive([2]);
    expect(numOfPairs).toEqual(1);
  });

  it('should return 5', () => {
    const numOfPairs = sumToPower.naive([-2, -1, 0, 1, 2]);
    expect(numOfPairs).toEqual(5);
  });
});
