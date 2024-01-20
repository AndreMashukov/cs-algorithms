const wordMatrix = require('../../src/backtracking/WordMatrix')

describe('WordMatrix', () => {
  it('should return result for the word "horizon"', async () => {
    const matrix = [
      ['t', 'z', 'x', 'c', 'd'],
      ['a', 'h', 'n', 'z', 'x'],
      ['h', 'w', 'o', 'i', 'o'],
      ['o', 'r', 'n', 'r', 'n'],
      ['a', 'b', 'r', 'i', 'n']
    ]

    const result = wordMatrix.solution(matrix, 'horizon')
    // expect(result).toContainEqual('horizon'.split('').sort())
    expect(result).toEqual([...new Set('horizon'.split(''))].sort())
  })
})
