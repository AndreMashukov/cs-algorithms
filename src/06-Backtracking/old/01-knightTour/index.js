/**
 * Finds a Knight's Tour on an n x n chessboard
 * @param {number} n - Size of the chessboard
 * @returns {number[][]} Matrix with the knight's path (empty if no solution)
 */
function findKnightTour(n) {
  // Initialize the board with zeros
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill(0));
  let moveCount = 1;

  // Possible moves for the knight (L-shape pattern)
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1]
  ];

  // Check if a move is valid
  const isValid = (x, y) =>
    x >= 0 && x < n && y >= 0 && y < n && board[x][y] === 0;

  // Recursive function to find the tour
  const solve = (x, y) => {
    board[x][y] = moveCount;

    // Base case: if all squares are visited
    if (moveCount === n * n) return true;

    // Try all possible moves
    for (const [dx, dy] of moves) {
      const nextX = x + dx;
      const nextY = y + dy;

      if (isValid(nextX, nextY)) {
        moveCount++;
        if (solve(nextX, nextY)) return true;
        moveCount--;
        board[nextX][nextY] = 0;
      }
    }

    return false;
  };

  // Start from top-left corner
  return solve(0, 0) ? board : [];
}

// Example usage:
console.log(findKnightTour(5));

module.exports = findKnightTour;

// [ 24, 5, 14, 9, 22 ],
// [ 13, 8, 23, 4, 15 ],
// [ 18, 1, 6, 21, 10 ],
// [ 7, 12, 19, 16, 3 ],
// [ 0, 17, 2, 11, 20 ]
