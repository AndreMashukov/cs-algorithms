const { enhancedHashmap } = require('../../../src/misc/04-march-2023/enhanced-hashmap')

describe('misc.mar2023.enhanced-hashmap', () => {
  it('should return 5', () => {
    const queryType = [
      'insert',
      'insert',
      'addToValue',
      'addToKey',
      'get'
    ]
    const query = [
      [1, 2],
      [2, 3],
      [2],
      [1],
      [3]
    ]

    const result = enhancedHashmap.solution(queryType, query)
    expect(result).toEqual(5)
  })

  it('should return 6', () => {
    const queryType = ['insert',
      'addToValue',
      'get',
      'insert',
      'addToKey',
      'addToValue',
      'get']
    const query = [[1, 2],
      [2],
      [1],
      [2, 3],
      [1],
      [-1],
      [3]]

    const result = enhancedHashmap.solution(queryType, query)
    expect(result).toEqual(6)
  })
})
