const rs = require('../../../src/dp/recStaircase/recursiveStaircaseDP');

describe('recursiveStaircaseDP', () => {
  it('should number of variants using Dynamic Programming solution', () => {
    expect(rs.recursiveStaircaseDP(-1)).toBe(0);
    expect(rs.recursiveStaircaseDP(0)).toBe(0);
    expect(rs.recursiveStaircaseDP(1)).toBe(1);
    expect(rs.recursiveStaircaseDP(2)).toBe(2);
    expect(rs.recursiveStaircaseDP(3)).toBe(3);
    expect(rs.recursiveStaircaseDP(4)).toBe(5);
    expect(rs.recursiveStaircaseDP(5)).toBe(8);
    expect(rs.recursiveStaircaseDP(6)).toBe(13);
    expect(rs.recursiveStaircaseDP(7)).toBe(21);
    expect(rs.recursiveStaircaseDP(8)).toBe(34);
    expect(rs.recursiveStaircaseDP(9)).toBe(55);
    expect(rs.recursiveStaircaseDP(10)).toBe(89);
  });
});
