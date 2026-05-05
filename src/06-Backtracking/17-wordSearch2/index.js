// https://leetcode.com/problems/word-search-ii/description/
// https://neetcode.io/problems/search-for-word-ii
// https://www.youtube.com/watch?v=asbcE9mZz_U
/**
 * Word Search II - LeetCode 212
 *
 * Trie + DFS with pruning:
 * - O(M * N * 4^L) worst-case paths, but pruning dead trie branches avoids revisiting useless prefixes.
 * - Board cells marked in place (no Set / string keys per step).
 * - Whole dictionary word stored at terminal nodes (no path string building).
 */

const A = 'a'.charCodeAt(0);

class TrieNode {
  constructor() {
    /** @type {(TrieNode | null)[]} */
    this.children = new Array(26).fill(null);
    /** @type {string | null} */
    this.word = null;
  }

  insert(word) {
    let cur = this;
    for (let i = 0; i < word.length; i++) {
      const idx = word.charCodeAt(i) - A;
      if (cur.children[idx] === null) {
        cur.children[idx] = new TrieNode();
      }
      cur = cur.children[idx];
    }
    cur.word = word;
  }
}

class Solution {
  /**
   * @param {character[][]} board
   * @param {string[]} words
   * @return {string[]}
   */
  findWords(board, words) {
    const root = new TrieNode();
    for (let i = 0; i < words.length; i++) {
      root.insert(words[i]);
    }

    const ROWS = board.length;
    const COLS = board[0].length;
    const res = [];

    /** @param {number} r @param {number} c @param {TrieNode} node parent trie node (matched prefix) */
    const dfs = (r, c, node) => {
      if (r < 0 || c < 0 || r >= ROWS || c >= COLS || board[r][c] === '#') return;

      const idx = board[r][c].charCodeAt(0) - A;
      const next = node.children[idx];
      if (next === null) return;

      const ch = board[r][c];
      board[r][c] = '#';

      if (next.word !== null) {
        res.push(next.word);
        next.word = null;
      }

      dfs(r + 1, c, next);
      dfs(r - 1, c, next);
      dfs(r, c + 1, next);
      dfs(r, c - 1, next);

      board[r][c] = ch;

      if (next.word === null) {
        const kids = next.children;
        let empty = true;
        for (let i = 0; i < 26; i++) {
          if (kids[i] !== null) {
            empty = false;
            break;
          }
        }
        if (empty) {
          node.children[idx] = null;
        }
      }
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dfs(r, c, root);
      }
    }

    return res;
  }
}

// Example usage
const board = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v'],
];

const words = ['oath', 'pea', 'eat', 'rain'];

const solution = new Solution();
console.log(solution.findWords(board, words));
// Output: ["oath","eat"] (order not specified)
