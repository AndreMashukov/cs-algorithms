const { solution } = require('../../../src/misc/06-dec-2023/nextGreater/nextGreater')

describe('misc.dec2023.nextGreater', () => {
  it('should return the correct array of indices', () => {
    const input = [1, 4, 2, 1, 7, 6]
    const expectedOutput = [1, 4, 1, 2, -1, 4]
    const result = solution(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should return the correct array of indices', () => {
    const input = [2, 1, 2, 1, 2]
    const expectedOutput = [-1, 0, -1, 2, -1]
    const result = solution(input)
    expect(result).toEqual(expectedOutput)
  })
})
