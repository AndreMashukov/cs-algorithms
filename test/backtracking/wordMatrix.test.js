const { solution, Trie } = require('../../src/backtracking/WordMatrix')

describe('WordMatrix', () => {
  let trie

  beforeEach(() => {
    trie = new Trie()
  })

  it('should return result for the word "horizon"', async () => {
    const matrix = [
      ['t', 'z', 'x', 'c', 'd'],
      ['a', 'h', 'n', 'z', 'x'],
      ['h', 'w', 'o', 'i', 'o'],
      ['o', 'r', 'n', 'r', 'n'],
      ['a', 'b', 'r', 'i', 'n']
    ]

    const result = solution(matrix, 'horizon')
    // expect(result).toContainEqual('horizon'.split('').sort())
    expect(result).toEqual([...new Set('horizon'.split(''))].sort())
  })

  test('inserts and searches for words correctly', () => {
    trie.insert('hello')
    trie.insert('world')
    trie.insert('hell')

    let node = trie.searchPrefix('hell')
    expect(node).not.toBeNull()
    expect(node.isEndOfWord).toBeTruthy()

    node = trie.searchPrefix('hello')
    expect(node).not.toBeNull()
    expect(node.isEndOfWord).toBeTruthy()

    node = trie.searchPrefix('world')
    expect(node).not.toBeNull()
    expect(node.isEndOfWord).toBeTruthy()

    node = trie.searchPrefix('worl')
    expect(node).not.toBeNull()
    expect(node.isEndOfWord).toBeFalsy()

    node = trie.searchPrefix('notinthetrie')
    expect(node).toBeNull()
  })
})
