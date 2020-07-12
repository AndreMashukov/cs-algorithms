const z = require('../../src/zAlgorithm/zAlgorithm');

describe('zAlgorithm', () => {
  it('should find word positions in given text', () => {
    expect(z.zAlgorithm('abcbcglx', 'abca')).toEqual([]);
    expect(z.zAlgorithm('abca', 'abca')).toEqual([0]);
    expect(z.zAlgorithm('abca', 'abcadfd')).toEqual([]);
    expect(z.zAlgorithm('abcbcglabcx', 'abc')).toEqual([0, 7]);
    expect(z.zAlgorithm('abcbcglx', 'bcgl')).toEqual([3]);
    expect(z.zAlgorithm('abcbcglx', 'cglx')).toEqual([4]);
    expect(z.zAlgorithm('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toEqual([15]);
    expect(z.zAlgorithm('abcxabcdabxabcdabcdabcy', 'abcdabca')).toEqual([]);
    expect(z.zAlgorithm('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca'))
        .toEqual([12]);
    expect(z.zAlgorithm('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa'))
        .toEqual([11]);
  });
});
