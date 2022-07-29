const mss = require('../../../src/dp/mss/mss');

describe('mss.dpMaximumSubarray', () => {
  it('should find maximum subarray using dynamic programming algorithm', () => {
    expect(mss.dpMaximumSubarray([])).toEqual([]);
    expect(mss.dpMaximumSubarray([0, 0])).toEqual([0]);
    expect(mss.dpMaximumSubarray([0, 0, 1])).toEqual([0, 0, 1]);
    expect(mss.dpMaximumSubarray([0, 0, 1, 2])).toEqual([0, 0, 1, 2]);
    expect(mss.dpMaximumSubarray([0, 0, -1, 2])).toEqual([2]);
    expect(mss.dpMaximumSubarray([-1, -2, -3, -4, -5])).toEqual([-1]);
    expect(mss.dpMaximumSubarray([1, 2, 3, 2, 3, 4, 5])).toEqual([
      1, 2, 3, 2, 3, 4, 5
    ]);
    expect(mss.dpMaximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual([
      4, -1, 2, 1
    ]);
    expect(mss.dpMaximumSubarray([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual([
      4, -1, -2, 1, 5
    ]);
    expect(mss.dpMaximumSubarray([1, -3, 2, -5, 7, 6, -1, 4, 11, -23])).toEqual(
      [7, 6, -1, 4, 11]
    );
  });
});

// https://www.youtube.com/watch?v=2MmGzdiKR9Y&t=1s
// Maximum contiguous subarray
