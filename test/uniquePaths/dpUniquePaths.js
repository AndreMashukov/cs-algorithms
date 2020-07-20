const up = require('../../src/uniquePaths/up.dpUniquePaths');

describe('dpUniquePaths', () => {
  it('should find the number of unique paths on board', () => {
    expect(up.dpUniquePaths(3, 2)).toBe(3);
    expect(up.dpUniquePaths(7, 3)).toBe(28);
    expect(up.dpUniquePaths(3, 7)).toBe(28);
    expect(up.dpUniquePaths(10, 10)).toBe(48620);
    expect(up.dpUniquePaths(100, 1)).toBe(1);
    expect(up.dpUniquePaths(1, 100)).toBe(1);
  });
});
