const { makeIncrease } = require('../../../src/misc/july2022/make-increase');

describe('misc.june2022.make-increase', () => {
  it('should return true', () => {
    const result = makeIncrease.naive([1, 5, 10, 20]);
    expect(result).toEqual(true);
  });
  it('should return true', () => {
    const result = makeIncrease.naive([1, 3, 900, 10]);
    expect(result).toEqual(true);
  });

  it('should return true', () => {
    const result = makeIncrease.naive([13, 31, 30]);
    expect(result).toEqual(false);
  });
});

// https://leetcode.com/discuss/interview-question/1528492/codesignal-makeincreasing#:~:text=You%20are%20allowed%20to%20choose,will%20be%20considered%20just%2010).
