/** Class for solving KnightTour problem. */
class KnightTour {
  /**
   * Constructs a nxn matrix.
   * @param {number} n - dimension.
   */
  constructor(n) {
    this.solution = Array(n)
        .fill(0)
        .map((x) => Array(n).fill(0));
    this.path = 0;
  }
  /**
   * Solves Knight’s Tour Problem for nxn matrix.
   * @param {number} n - graph we're going to traverse.
   * @return {matrix} - matrix filled with steps.
   */
  solve() {
    const success = this.findPath(0, 0, 0, this.solution.length);
    return success ? this.solution : [];
  }
  /**
   * this.findPath
   * @param {number} row - row.
   * @param {number} column - column.
   * @param {number} index - index.
   * @param {number} N - bumber.
   * @return {boolean} - if move is allowed.
   */
  findPath(row, column, index, N) {
    // check if current is not used already
    if (this.solution[row][column] !== 0) {
      return false;
    }
    // mark the current cell is as used
    this.solution[row][column] = this.path++;
    console.log(this.solution);
    // if (index == 50) {
    if (index === N * N - 1) {
      // if we are here means we have solved the problem
      return true;
    }
    // try to solve the rest of the problem recursively

    // go down and right
    if (
      canMove(row + 2, column + 1, N) &&
      this.findPath(row + 2, column + 1, index + 1, N)
    ) {
      return true;
    }
    // go right and down
    if (
      canMove(row + 1, column + 2, N) &&
      this.findPath(row + 1, column + 2, index + 1, N)
    ) {
      return true;
    }
    // go right and up
    if (
      canMove(row - 1, column + 2, N) &&
      this.findPath(row - 1, column + 2, index + 1, N)
    ) {
      return true;
    }
    // go up and right
    if (
      canMove(row - 2, column + 1, N) &&
      this.findPath(row - 2, column + 1, index + 1, N)
    ) {
      return true;
    }
    // go up and left
    if (
      canMove(row - 2, column - 1, N) &&
      this.findPath(row - 2, column - 1, index + 1, N)
    ) {
      return true;
    }
    // go left and up
    if (
      canMove(row - 1, column - 2, N) &&
      this.findPath(row - 1, column - 2, index + 1, N)
    ) {
      return true;
    }
    // go left and down
    if (
      canMove(row + 1, column - 2, N) &&
      this.findPath(row + 1, column - 2, index + 1, N)
    ) {
      return true;
    }
    // go down and left
    if (
      canMove(row + 2, column - 1, N) &&
      this.findPath(row + 2, column - 1, index + 1, N)
    ) {
      return true;
    }
    // if we are here means nothing has worked , backtrack
    this.solution[row][column] = 0;
    this.path--;
    return false;

    /**
     * Validates the move
     * @param {number} row - row.
     * @param {number} col - column.
     * @param {number} N - bumber.
     * @return {boolean} - if move is allowed.
     */
    function canMove(row, col, N) {
      if (row >= 0 && col >= 0 && row < N && col < N) {
        return true;
      }
      return false;
    }
  }
}

exports.default = KnightTour;

// example usage
const knightTour = new KnightTour(5);
console.log(knightTour.solve());


// Problem:
// Given a chessboard of size n x n, find a knight's tour.
// A knight's tour is a sequence of moves of a knight on a chessboard, 
// such that the knight visits every square exactly once.
// The knight moves in an "L" shape: two squares in one direction
//  and one square in a perpendicular direction.


// Solution:
// We can use backtracking to solve this problem.
// We can start from any cell on the chessboard and try to find a path that visits every cell exactly once.
// We can use a recursive function to try to find a path that visits every cell exactly once.
