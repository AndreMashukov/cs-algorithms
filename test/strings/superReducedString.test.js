const srs = require('../../src/strings/superReducedString');

describe('Super Reduced String', () => {
  it('should return reduced string', () => {
    expect(srs.superReducedString('aaabccddd')).toBe('abd');
    expect(srs.superReducedString('aa')).toBe('Empty String');
    expect(srs.superReducedString('baab')).toBe('Empty String');
    // eslint-disable-next-line max-len
    expect(srs.superReducedString('acdqglrfkqyuqfjkxyqvnrtysfrzrmzlygfveulqfpdbhlqdqrrqdqlhbdpfqluevfgylzmrzrfsytrnvqyxkjfquyqkfrlacdqj')).toBe('acdqgacdqj');
  });
});
