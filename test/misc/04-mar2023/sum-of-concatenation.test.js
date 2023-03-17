// const {rotatedRectSum} = require('../../../src/misc/feb2023/rotated-rect-sum');

describe('misc.mar2023.sum-of-concatenation', () => {
  it('should return 1334', () => {
    const a = [10, 2];

    const result = sumOfConcatenation.solution(a);
    expect(result).toEqual(1334);
  });

  it('should return 88', () => {
    const a = [8];

    const result = sumOfConcatenation.solution(a);
    expect(result).toEqual(88);
  });

  it('should return 198', () => {
    const a = [1, 2, 3];

    const result = sumOfConcatenation.solution(a);
    expect(result).toEqual(298);
  });
});
