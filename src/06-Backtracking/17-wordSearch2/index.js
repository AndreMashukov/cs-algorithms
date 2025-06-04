// https://leetcode.com/problems/word-search-ii/description/
// https://neetcode.io/problems/search-for-word-ii
// https://www.youtube.com/watch?v=asbcE9mZz_U
/**
 * Word Search II - LeetCode 212
 * 
 * Problem:
 * Given a 2D board of characters and a list of words, find all words from the list
 * that can be formed by traversing the board. Words can be constructed from letters
 * of sequentially adjacent cells (horizontal or vertical neighbors only).
 * The same cell cannot be used more than once in a word.
 * 
 * Time Complexity: O(M * N * 4^L) where:
 * - M, N are the dimensions of the board
 * - L is the maximum length of a word
 * 
 * Space Complexity: O(K) where K is the total number of characters in all words
 */

/**
 * TrieNode class represents a node in the Trie data structure
 * Used for efficient word lookup during board traversal
 */
class TrieNode {
  constructor() {
    this.children = {};  // Maps characters to child nodes
    this.isWord = false; // Marks if this node represents end of a word
  }

  /**
   * Adds a word to the Trie
   * @param {string} word - The word to add to the Trie
   */
  addWord(word) {
    let cur = this;
    for (const c of word) {
      if (!(c in cur.children)) {
        cur.children[c] = new TrieNode();
      }
      cur = cur.children[c];
    }
    cur.isWord = true;
  }
}

class Solution {
  /**
   * Finds all words from the given list that exist in the board
   * @param {character[][]} board - 2D grid of characters
   * @param {string[]} words - Array of words to search for
   * @return {string[]} - Array of found words
   */
  findWords(board, words) {
    // Build Trie from the word list
    const root = new TrieNode();
    for (const word of words) {
      root.addWord(word);
    }

    const ROWS = board.length,
          COLS = board[0].length;
    const res = new Set(),    // Stores found words (eliminates duplicates)
          visit = new Set();   // Tracks visited cells during DFS

    /**
     * DFS function to explore the board and find words
     * @param {number} r - Current row
     * @param {number} c - Current column
     * @param {TrieNode} node - Current node in the Trie
     * @param {string} word - Word formed so far
     */
    const dfs = (r, c, node, word) => {
      // Base cases: out of bounds, already visited, or invalid character
      if (
        r < 0 ||
        c < 0 ||
        r >= ROWS ||
        c >= COLS ||
        visit.has(`${r},${c}`) ||
        !(board[r][c] in node.children)
      ) {
        return;
      }

      // Mark current cell as visited
      visit.add(`${r},${c}`);
      
      // Move to next Trie node and add current character to word
      node = node.children[board[r][c]];
      word += board[r][c];
      
      // If we've found a complete word, add it to results
      if (node.isWord) {
        res.add(word);
        node.isWord = false
      }

      // Explore all four directions (up, down, left, right)
      dfs(r + 1, c, node, word);  // Down
      dfs(r - 1, c, node, word);  // Up
      dfs(r, c + 1, node, word);  // Right
      dfs(r, c - 1, node, word);  // Left

      // Backtrack: remove current cell from visited set
      visit.delete(`${r},${c}`);
    };

    // Start DFS from every cell in the board
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dfs(r, c, root, '');
      }
    }

    return Array.from(res);
  }
}

// Example usage
const board = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v']
];

const words = ['oath', 'pea', 'eat', 'rain'];

const solution = new Solution();
console.log(solution.findWords(board, words));
// Output: ["eat","oath"]

