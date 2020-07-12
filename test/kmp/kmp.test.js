const kmp = require('../../src/kmp/kmp');

describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(kmp.knuthMorrisPratt('', '')).toBe(0);
    expect(kmp.knuthMorrisPratt('a', '')).toBe(0);
    expect(kmp.knuthMorrisPratt('a', 'a')).toBe(0);
    expect(kmp.knuthMorrisPratt('abcbcglx', 'abca')).toBe(-1);
    expect(kmp.knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3);
    expect(kmp.knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy'))
        .toBe(15);
    expect(kmp.knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca'))
        .toBe(-1);
    expect(kmp.knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca'))
        .toBe(12);
    expect(kmp.knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy',
        'aabaabaaa')).toBe(11);
  });
});
