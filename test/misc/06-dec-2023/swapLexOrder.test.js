const solution = require('../../../src/misc/06-dec-2023/swapLexOrder')

describe('solution', () => {
  it('should swap characters in the string based on the given pairs', () => {
    const str = 'abdc'
    const pairs = [[1, 4], [3, 4]]
    expect(solution(str, pairs)).toBe('dbca')
  })

  // it('should handle empty string and empty pairs', () => {
  //   const str = ''
  //   const pairs = []
  //   expect(solution(str, pairs)).toBe('')
  // })
})
