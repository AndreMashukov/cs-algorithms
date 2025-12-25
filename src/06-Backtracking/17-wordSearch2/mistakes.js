/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  class TrieNode {
    constructor() {
      this.children = {};
      this.isWord = {};
    }

    addWord(word) {
      let cur = this;
      for (let w of word) {
        if (!(w in cur.children)) {
          cur.children[w] = new TrieNode()
        }
        cur = cur.children[w]
      }
      cur.isWord = true
    }
  }

const ROWS = board.length;
const COLS = board[0].length;
const res = new Set();
const visited = new Set();

const root = new TrieNode();
for (let w of words) {
  root.addWord(w)
}

// console.log(root)

const dfs = (r, c, node, word) => {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS || visited.has(`${r},${c}`) || !(node.children[board[r][c]])) {
    return false
  }

  visited.add(`${r},${c}`);

  node = node.children[board[r][c]];
  word += board[r][c]

  if (node.isWord) {
    res.add(word)
  }

  dfs(r + 1, c, node, word)
  dfs(r - 1, c, node, word)
  dfs(r, c + 1, node, word)
  dfs(r, c - 1, node, word)

  visited.delete(`${r},${c}`)
}

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    dfs(r, c, root, "")
  }
}

return Array.from(res)

};