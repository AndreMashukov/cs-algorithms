/** Class representing node. */
class Board {
  /**
   * Constructs a nxn board.
   * @param {number} n - dimension.
   */
  constructor(n) {
    this.n = n;
    this.setKnightMove(1, 1);
    this.memo = [];
    this.clearMemo();
    /* prepend and append with n - 1 rows */
    for (let i = 0; i < n - 1; i++) {
      this.memo[-n + 1 + i] = this.memo[n + i] = Array(n).fill(-1);
    }
    /* prepend and append with n - 1 columns */
    for (let i = -n + 1; i < 2 * n - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        this.memo[i][-n + 1 + j] = this.memo[i][n + j] = -1;
      }
    }
  }
  /**
   * clearMemo
   */
  clearMemo() {
    // preparing memo matrix n x n
    // filling with the maximum possible moves - number of all cells n^2
    for (let i = 0; i < this.n; i++) {
      if (!this.memo[i]) {
        // creating for the first time
        this.memo[i] = Array(this.n).fill(this.n ** 2);
      } else {
        for (let j = 0; j < this.n; j++) {
          this.memo[i][j] = this.n ** 2;
        }
      }
    }
  }
  /**
   * setKnightMove
   * @param {number} a - size of step on x.
   * @param {number} b - size of step on y.
   */
  setKnightMove(a, b) {
    // a - knight move step vertical, b - move step horizontal
    this.a = a;
    this.b = b;
  }
  /**
   * getMinMoves
   * @param {number} a - size of step on x.
   * @param {number} b - size of step on y.
   * @return {[]}
   */
  getMinMoves(a, b) {
    this.clearMemo();
    this.setKnightMove(a, b);
    this.checkMoves();
    return this.memo[this.n - 1][this.n - 1] < this.n ** 2 ?
      this.memo[this.n - 1][this.n - 1] :
      -1;
  }

  /**
   * checkMoves
   * @param {number} i - size of step on x.
   * @param {number} j - size of step on y.
   * @param {[]} moves - size of step on y.
   */
  checkMoves(i = 0, j = 0, moves = 0) {
    if (this.memo[i][j] > moves) {
      this.memo[i][j] = this.memo[j][i] = moves; // more optimal way found
    } else {
      return; // this way is not optimail
    }
    if (i == this.n - 1 && j == this.n - 1) {
      // reached the goal
      return;
    }
    // look for possible moves
    const [a, b] = [this.a, this.b];
    for (const [p, q] of [
      // 8 knight moves
      [i - a, j - b],
      [i - b, j - a],
      [i - a, j + b],
      [i + a, j - b],
      [i - b, j + a],
      [i + b, j - a],
      [i + a, j + b],
      [i + b, j + a],
    ]) {
      if (this.memo[p][q] > -1) {
        // inside the board
        this.checkMoves(p, q, moves + 1);
      }
    }
  }
}

/**
 * Constructs a nxn board.
 * @param {number} n - dimension.
 * @return {[]}
 */
function knightlOnAChessboard(n) {
  const board = new Board(n);
  const result = [];
  for (let i = 1; i < n; i++) {
    result[i - 1] = [];
  }
  for (let i = 1; i < n; i++) {
    for (let j = i; j < n; j++) {
      result[j - 1][i - 1] = result[i - 1][j - 1] = board.getMinMoves(i, j);
    }
  }
  return result;
}

exports.default = knightlOnAChessboard;
