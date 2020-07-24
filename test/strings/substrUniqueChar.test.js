const suc = require('../../src/strings/substrUniqueChar');

describe('Longest substring with at most K unique characters', () => {
  it('should return string with at most K unique characters', () => {
    expect(suc.find('aabbaacdeeeeddded', 3).substr).toBe('cdeeeeddded');
    expect(suc.find('abcddefabc', 4).substr).toBe('abcdd');
    expect(suc.find('aaaabbbb', 4).substr).toBe('N/A');
  });
});
