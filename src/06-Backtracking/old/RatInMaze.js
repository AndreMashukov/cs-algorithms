/** Class for rat in maze algorithm. */
class RatInMaze {
  /**
   * Constructs a nxn matrix.
   * @param {number} n - dimension.
   */
  constructor(n) {
    this.solution = Array(n)
      .fill(0)
      .map((x) => Array(n).fill(0));
  }
  /**
   * solveMaze
   * @param {[][]} maze
   * @param {number} N
   * @return {boolean}
   */
  solveMaze(maze, N) {
    if (this.findPath(maze, 0, 0, N, 'down')) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * isSafeToGo
   * @param {[][]} maze
   * @param {number} x
   * @param {number} y
   * @param {number} N
   * @return {boolean}
   */
  isSafeToGo(maze, x, y, N) {
    // check if x and y are in limits and cell is not blocked
    if (x >= 0 && y >= 0 && x < N && y < N && maze[x][y] != 0) {
      return true;
    }
    return false;
  }
  /**
   * findPath
   * @param {[][]} maze
   * @param {number} x
   * @param {number} y
   * @param {number} N
   * @param {string} direction
   * @return {boolean}
   */
  findPath(maze, x, y, N, direction) {
    // check if maze[x][y] is feasible to move
    if (x === N - 1 && y === N - 1) {
      // we have reached
      this.solution[x][y] = 1;
      return true;
    }
    if (this.isSafeToGo(maze, x, y, N)) {
      // move to maze[x][y]
      this.solution[x][y] = 1;
      // now rat has four options, either go right OR go down or left or go up
      if (direction !== 'up' && this.findPath(maze, x + 1, y, N, 'down')) {
        // go down
        return true;
      }
      if (direction !== 'left' && this.findPath(maze, x, y + 1, N, 'right')) {
        // go right
        return true;
      }
      if (direction !== 'down' && this.findPath(maze, x - 1, y, N, 'up')) {
        // go up
        return true;
      }
      if (direction !== 'right' && this.findPath(maze, x, y - 1, N, 'left')) {
        // go left
        return true;
      }
      // if none of the options work out BACKTRACK undo the move
      this.solution[x][y] = 0;
      return false;
    }
    return false;
  }
  /**
   * Get solution
   * @return {[][]}
   */
  getSolution() {
    console.log(this.solution);
    return this.solution;
  }
}

exports.default = RatInMaze;

// Approach:
// Create a solution matrix of the same structure as maze.
// Whenever rat moves to cell in a maze,
// mark that particular cell in solution matrix.
// At the end print the solution matrix, follow
// that 1’s from the top left corner,
// it will be that path for the rat.

// Algorithm:
// 1. If rat reaches the destination
//     1.1. print the solution matrix.
//     1.2. Else
//         @. Mark the current cell in solution matrix as 1
//         @. If previous step is not in vertical direction (upwards)
//             then move forward in the vertical direction(downwards)
//             and recursively check if this movement leads to solution.
//         @. If movement in above step doesn’t lead to the solution
//             and If previous step is not
//             in horizontal direction (towards left)
//             then move forward in the horizontal direction(towards right)
//             and recursively check if this movement leads to solution.
// 2. If movement in above step doesn’t lead to the solution and
//     If previous step is not in vertical direction (downwards)
//     then move forward in the horizontal direction(upwards)
//     and recursively check if this movement leads to solution.
// 3. If movement in above step doesn’t lead to the solution
//     and If previous step is not in horizontal direction (towards right)
//     then move forward in the horizontal direction(towards left)
//     and recursively check if this movement leads to solution.
// 4. If none of the above solution works then BACKTRACK
//    and mark the current cell as 0.
