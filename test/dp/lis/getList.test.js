const getLis = require('../../../src/dp/lis/getLis');

describe('dpLongestIncreasingSubsequence', () => {
  it('should find longest increasing subsequence', () => {
    expect(
      getLis.longestIncreasingSubsequence([
        1, 9, 5, 13, 3, 11, 7, 15, 2, 10, 6, 14, 4, 12, 8, 16
      ])
    ).toStrictEqual([1, 3, 7, 10, 12, 16]);

    expect(
      getLis.longestIncreasingSubsequence([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
    ).toStrictEqual([0]);

    expect(
      getLis.longestIncreasingSubsequence([3, 4, -1, 0, 6, 2, 3])
    ).toStrictEqual([-1, 0, 2, 3]);

    expect(
      getLis.longestIncreasingSubsequence([9, 8, 7, 1, 6, 2, 5, 4, 3, 0])
    ).toStrictEqual([1, 2, 3]);
  });
});
