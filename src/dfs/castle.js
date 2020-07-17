/** Class representing a POINT. */
class Point {
  /**
   * Constructor for point
   * @param {number} x - matrix of integers
   * @param {number} y - matrix of integers
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
/**
 * Prints an integer denoting the minimum number of steps required
 * to move the castle to the goal position.
 * @param {array} grid - matrix of integers
 * @param {number} startRow - target cell X
 * @param {number} startCol - target cell X
 * @param {number} endRow - target cell X
 * @param {number} endCol - target cell Y
 * @return {number} - the number of moves it will take
 * to get to the end position
 */
function minimumMoves(grid, startRow, startCol, endRow, endCol) {
  const move = [];
  const startX = startRow;
  const startY = startCol;
  const goalX = endRow;
  const goalY = endCol;

  const n = grid.length;
  game = Array(n).fill(0).map((x) => Array(n).fill(0));
  helper = Array(n).fill(0).map((x) => Array(n).fill(0));
  for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
      if (grid[i].charAt(j) === '.') {
        game[i][j] = 100;
      } else {
        game[i][j] = -1;
      }
    }
  }

  const start = new Point(startX, startY);
  move.push(start);
  game[startX][startY] = 0;

  while (move.length > 0) {
    const current = move.pop();
    if (helper[current.x][current.y] === 0) {
      helper[current.x][current.y] = 1;
      moveGenerator(current, grid.length, move);
    }
  }
  return game[goalX][goalY];
}

/**
 * Add a new Point to move array
 * @param {Point} p -point
 * @param {number} n - grid.length
 * @param {array} _move - array of points
 */
function moveGenerator(p, n, _move) {
  const x = p.x;
  const y = p.y;
  const value = game[x][y];
  for (let i=x; i<n && game[i][y]!=-1; i++) {
    addStep(i, y, value);
    _move.push(new Point(i, y));
  }
  for (let i=x; i>=0 && game[i][y]!=-1; i--) {
    addStep(i, y, value);
    _move.push(new Point(i, y));
  }
  for (let i=y; i<n && game[x][i]!=-1; i++) {
    addStep(x, i, value);
    _move.push(new Point(x, i));
  }
  for (let i=y; i>=0 && game[x][i]!=-1; i--) {
    addStep(x, i, value);
    _move.push(new Point(x, i));
  }
}

/**
 * Puts the number of moves on the grid
 * @param {number} x - x
 * @param {number} y - y
 * @param {number} value - number of moves made.
 */
function addStep(x, y, value) {
  // console.log(game);
  if (game[x][y] > value+1) {
    game[x][y] = value+1;
  }
}

module.exports.minimumMoves = minimumMoves;

// You are given a square grid with
// some cells open (.) and some blocked (X).
// Your playing piece can move along any row or column
// until it reaches the edge of the grid or a blocked cell.
// Given a grid, a start and an end position, determine the number
// of moves it will take to get to the end position.
