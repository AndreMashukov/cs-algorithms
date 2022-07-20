const { threeArrays } = require('../../../src/misc/july2022/three-arrays');

describe('misc.july2022.three-arrays', () => {
  it('should return 2 subarrays', () => {
    const a = [2, 1, 7, 1, 1, 5, 3, 5, 2, 1, 1, 1];
    const b = [1, 3, 5];
    const c = [2, 3];
    const result = threeArrays.solution(a, b, c);
    expect(result).toStrictEqual([
      [1, 1, 5],
      [1, 1, 1]
    ]);
  });

  it('should return 0 subarrays', () => {
    const a = [1, 2, 3];
    const b = [];
    const c = [];
    const result = threeArrays.solution(a, b, c);
    expect(result).toStrictEqual([]);
  });
});

// https://leetcode.com/discuss/interview-question/1528526/codesignal-longestinversionalsubarray
// You are given three arrays of integers a, b, and c. Your task is to find the longest contiguous subarray of a containing only elements that appear in b but do not appear in c.
// Return this longest subarray. If there is more than one longest subarray satisfying these conditions, return any of these possible subarrays.
// Example
// For a = [2, 1, 7, 1, 1, 5, 3, 5, 2, 1, 1, 1], b = [1, 3, 5], and c = [2, 3], the output can be solution(a, b, c) = [1, 1, 5].

// There is no contiguous subarray of length 4 satisfying all the requirements:

// a[0..3] = [2, 1, 7, 1] contains the number a[2] = 7, which doesn't appear in b;
// a[1..4] = [1, 7, 1, 1] contains the number a[2] = 7, which doesn't appear in b;
// a[2..5] = [7, 1, 1, 5] contains the number a[2] = 7, which doesn't appear in b;
// a[3..6] = [1, 1, 5, 3] contains the number a[6] = 3, which does appear in c (which is prohibited);
// a[4..7] = [1, 5, 3, 5] contains the number a[6] = 3, which does appear in c;
// a[5..8] = [5, 3, 5, 2] contains the number a[6] = 3, which does appear in c;
// a[6..9] = [3, 5, 2, 1] contains the number a[6] = 3, which does appear in c;
// a[7..10] = [5, 2, 1, 1] contains the number a[8] = 2, which doesn't appear in b;
// a[8..11] = [2, 1, 1, 1] contains the number a[8] = 2, which doesn't appear in b.
// There are two possible contiguous subarrays of length 3 satisfying all the requirements:

// a[3..5] = [1, 1, 5]: both numbers 1 and 5 appear in b, and both of these numbers don't appear in c.
// a[9..11] = [1, 1, 1]: the number 1 appears in b, and doesn't appear in c.
