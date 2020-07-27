/** Class for word search. */
class WordMatrix {
  /**
   * Constructs a nxn matrix.
   * @param {number} n - dimension.
   */
  constructor(n) {
    this.solution = Array(n)
        .fill(0)
        .map((x) => Array(n).fill(0));
    this.path = 1;
  }
  /**
   * searchWord
   * @param {[][]} matrix - matrix with letters.
   * @param {string} word - word.
   * @return {boolean}
   */
  searchWord(matrix, word) {
    const N = matrix.length;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (this.search(matrix, word, i, j, 0, N)) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * search
   * @param {[][]} matrix - matrix with letters.
   * @param {string} word - word.
   * @param {number} row - row.
   * @param {number} col - col.
   * @param {number} index
   * @param {number} N
   * @return {boolean}
   */
  search(matrix, word, row, col, index, N) {
    // check if current cell not already used or character in it is not not
    if (
      this.solution[row][col] != 0 ||
      word.charAt(index) != matrix[row][col]
    ) {
      return false;
    }

    if (index === word.length - 1) {
      // word is found, return true
      this.solution[row][col] = this.path++;
      return true;
    }

    // mark the current cell as 1
    this.solution[row][col] = this.path++;
    // check if cell is already used
    if (row + 1 < N && this.search(matrix, word, row + 1, col, index + 1, N)) {
      // go
      // down
      return true;
    }
    if (row - 1 >= 0 && this.search(matrix, word, row - 1, col, index + 1, N)) {
      // go
      // up
      return true;
    }
    if (col + 1 < N && this.search(matrix, word, row, col + 1, index + 1, N)) {
      // go
      // right
      return true;
    }
    if (col - 1 >= 0 && this.search(matrix, word, row, col - 1, index + 1, N)) {
      // go
      // left
      return true;
    }
    if (
      row - 1 >= 0 &&
      col + 1 < N &&
      this.search(matrix, word, row - 1, col + 1, index + 1, N)
    ) {
      // go diagonally up right
      return true;
    }
    if (
      row - 1 >= 0 &&
      col - 1 >= 0 &&
      this.search(matrix, word, row - 1, col - 1, index + 1, N)
    ) {
      // go diagonally up left
      return true;
    }
    if (
      row + 1 < N &&
      col - 1 >= 0 &&
      this.search(matrix, word, row + 1, col - 1, index + 1, N)
    ) {
      // go diagonally down left
      return true;
    }
    if (
      row + 1 < N &&
      col + 1 < N &&
      this.search(matrix, word, row + 1, col + 1, index + 1, N)
    ) {
      // go diagonally down right
      return true;
    }

    // if none of the option works out, BACKTRACK and return false
    this.solution[row][col] = 0;
    this.path--;
    return false;
  }
  /**
   * Get solution
   * @return {[][]}
   */
  getSolution() {
    return this.solution;
  }
}

exports.default = WordMatrix;
