/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  class TrieNode {
    constructor() {
      this.children = {};
      this.isWord = false;
    }

    addWord(word) {
      let cur = this
      for (let c of word) {
        // console.log(cur)
        if (!(c in cur.children)) {
          cur.children[c] = new TrieNode()
        }
        cur = cur.children[c]
      }
      cur.isWord = true
    }
  }

  const root = new TrieNode();
  for (let word of words) {
    root.addWord(word)
  }

  const visit = new Set();
  const res = new Set();
  const ROWS = board.length;
  const COLS = board[0].length;

  const dfs = (r, c, node, word) => {
    const key = `${r},${c}`;

    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || visit.has(key) || !(board[r][c] in node.children)) {
      return
    }

    visit.add(key);
    node = node.children[board[r][c]];
    word += board[r][c];

    if (node.isWord) {
      res.add(word)
      node.isWord = false
    }

    dfs(r + 1, c, node, word)
    dfs(r - 1, c, node, word)
    dfs(r, c + 1, node, word)
    dfs(r, c - 1, node, word)

    visit.delete(key)
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      dfs(r, c, root, "");
    }
  }

  return Array.from(res)
};