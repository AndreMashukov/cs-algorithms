class TrieNode {
  constructor () {
    this.children = new Map()
    this.isEndOfWord = false
  }
}

class Trie {
  constructor () {
    this.root = new TrieNode()
  }

  insert (word) {
    let node = this.root
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode())
      }
      node = node.children.get(char)
    }
    node.isEndOfWord = true
  }

  searchPrefix (prefix) {
    console.log(this)
    let node = this.root
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return null
      }
      node = node.children.get(char)
    }
    return node
  }
}

// the output should be
// solution(board, words) = ["CODE", "RULES"].

function solution (board, words) {
  const result = []
  const trie = new Trie()

  for (const word of words) {
    trie.insert(word)
  }

  function backtrack (word, i, j, visited, trieNode) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || visited[i][j]) {
      return
    }

    const char = board[i][j]
    const nextTrieNode = trieNode.children.get(char)

    if (!nextTrieNode) {
      return
    }

    word += char
    visited[i][j] = true

    if (nextTrieNode.isEndOfWord && !result.includes(word)) {
      result.push(word)
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x !== 0 || y !== 0) {
          backtrack(word, i + x, j + y, [...visited.map(row => [...row])], nextTrieNode)
        }
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      backtrack('', i, j, Array.from({ length: board.length }, () => Array(board[0].length).fill(false)), trie.root)
    }
  }

  return result.sort()
}

module.exports = {
  solution,
  Trie
}


// example usage
const board = [
  ['C', 'O', 'D', 'E'],
  ['R', 'U', 'L', 'E'],
  ['S', 'E', 'R', 'E']
]

const words = ['CODE', 'RULES']

console.log(solution(board, words))

// output:
// [ 'CODE', 'RULES' ]  