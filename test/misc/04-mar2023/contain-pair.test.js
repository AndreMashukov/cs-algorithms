const { containPair } = require('../../../src/misc/04-march-2023/contain-pair')

describe('misc.mar2023.contain-pair', () => {
  it('should return 5', () => {
    const a = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7]
    const m = 4
    const k = 10

    const result = containPair.solution(a, m, k)
    expect(result).toEqual(5)
  })

  it('should return 2', () => {
    const a = [15, 8, 8, 2, 6, 4, 1, 7]
    const m = 2
    const k = 8

    const result = containPair.solution(a, m, k)
    expect(result).toEqual(2)
  })
})
