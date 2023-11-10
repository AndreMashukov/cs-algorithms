const { solution } = require('../../../src/misc/05-nov-2023/make-increase')

describe('misc.july2022.make-increase', () => {
  it('should return true', () => {
    const result = solution([1, 5, 10, 20])
    expect(result).toEqual(true)
  })
  it('should return true', () => {
    const result = solution([1, 3, 900, 10])
    expect(result).toEqual(true)
  })

  it('should return true', () => {
    const result = solution([13, 31, 30])
    expect(result).toEqual(false)
  })
})

// https://leetcode.com/discuss/interview-question/1528492/codesignal-makeincreasing#:~:text=You%20are%20allowed%20to%20choose,will%20be%20considered%20just%2010).

// You are given an array of non-negative integers numbers.
//   You are allowed to choose any number from this array and swap any two digits in it.
//   If after the swap operation the number contains leading zeros,
//   they can be omitted and not considered (eg: 010 will be considered just 10).

// Your task is to check whether it is possible to apply the swap operation at most once,
//   so that the elements of the resulting array are strictly increasing.
