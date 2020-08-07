const superReducedString = require('../../src/strings/superReducedString')
    .default;

describe('Super Reduced String', () => {
  it('should return reduced string', () => {
    expect(superReducedString('aaabccddd')).toBe('abd');
    expect(superReducedString('aa')).toBe('Empty String');
    expect(superReducedString('baab')).toBe('Empty String');
    // eslint-disable-next-line max-len
    expect(superReducedString('acdqglrfkqyuqfjkxyqvnrtysfrzrmzlygfveulqfpdbhlqdqrrqdqlhbdpfqluevfgylzmrzrfsytrnvqyxkjfquyqkfrlacdqj')).toBe('acdqgacdqj');
  });
});
