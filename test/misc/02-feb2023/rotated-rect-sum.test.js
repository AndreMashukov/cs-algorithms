const {rotatedRectSum} = require('../../../src/misc/feb2023/rotated-rect-sum');

describe('misc.feb2023.rotated-rect-sum', () => {
  it('should return 36', () => {
    const matrix = [
      [1, 2, 3, 4, 0],
      [5, 6, 7, 8, 1],
      [3, 2, 4, 1, 4],
      [4, 3, 5, 1, 6],
    ];

    const result = rotatedRectSum.solution(matrix, 2, 3);
    expect(result).toEqual(36);
  });

  it('should return 7', () => {
    const matrix = [
      [-2, 3],
      [4, 3],
    ];

    const result = rotatedRectSum.solution(matrix, 1, 2);
    expect(result).toEqual(7);
  });

  it('should return 10', () => {
    const matrix = [
      [-2, 3, 5, -1],
      [4, 3, -10, 10],
    ];

    const result = rotatedRectSum.solution(matrix, 1, 1);
    expect(result).toEqual(10);
  });
});

// https://leetcode.com/discuss/interview-question/1482150/rotatedrectsum-codesignal-quora-two-sigma-oa
