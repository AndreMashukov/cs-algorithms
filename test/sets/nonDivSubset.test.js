const nds = require('../../src/sets/nonDivSubset');

describe('nonDivisibleSubsets', () => {
  it('should return the size of the largest possible subset', () => {
    expect(nds.nonDivisibleSubset(4, [19, 10, 12, 10, 24, 25, 22])).toEqual(3);
    expect(nds.nonDivisibleSubset(3, [1, 7, 2, 4])).toEqual(3);
    expect(nds.nonDivisibleSubset(7, [
      278, 576, 496, 727, 410, 124, 338, 149,
      209, 702, 282, 718, 771, 575, 436])).toEqual(11);
  });
});

// The sums of all permutations of two elements from
// [1, 7, 2, 4] are:
// 1 + 7 = 8
// 1 + 2 = 3
// 1 + 4 = 5
// 7 + 2 = 9
// 7 + 4 = 11
// 2 + 4 = 6
// We see that only [1, 7, 4]  will not ever sum to a multiple of 3.
