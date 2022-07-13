const { digitAnagram } = require('../../../src/misc/july2022/digit-anagram');

describe('misc.july2022.digit-anagram', () => {
  it('should return 4', () => {
    const result = digitAnagram.solution([25, 35, 872, 228, 53, 278, 872]);
    expect(result).toEqual(4);
  });
});
