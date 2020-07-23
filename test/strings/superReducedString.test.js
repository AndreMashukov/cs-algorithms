const srs = require('../../src/strings/superReducedString');

describe('Super Reduced String', () => {
  it('should return reduced string', () => {
    expect(srs.superReducedString('aaabccddd')).toBe('abd');
  });
});
