// 304. Range Sum Query 2D - Immutable
// https://www.youtube.com/watch?v=KE8MQuwE2yA
// https://leetcode.com/problems/range-sum-query-immutable/
// Given a 2D matrix matrix, handle multiple queries of the following type:

// Calculate the sum of the elements of matrix inside
// the rectangle defined by its upper left corner (row1, col1)
// and lower right corner (row2, col2).
// Implement the NumMatrix class:

// NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
// int sumRegion(int row1, int col1, int row2, int col2)
// Returns the sum of the elements of matrix inside the rectangle
// defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
// You must design an algorithm where sumRegion works on O(1) time complexity.

/**
 * @param {number[][]} matrix
 */
const NumMatrix = function (matrix) {
  const ROWS = matrix.length
  const COLS = matrix[0].length
  this.matrix = matrix
  this.dp = Array.from({ length: ROWS + 1 }, () => Array(COLS + 1).fill(0))

  for (let r = 1; r <= ROWS; r++) {
    let prefix = 0
    for (let c = 1; c <= COLS; c++) {
      prefix += matrix[r - 1][c - 1]
      const above = this.dp[r - 1][c]
      this.dp[r][c] = prefix + above
    }
  }
}

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  console.log(this.dp)
  const r1 = row1 + 1
  const c1 = col1 + 1
  const r2 = row2 + 1
  const c2 = col2 + 1

  const bottomRight = this.dp[r2][c2]
  const above = this.dp[r1 - 1][c2]
  const left = this.dp[r2][c1 - 1]
  const topLeft = this.dp[r1 - 1][c1 - 1]

  return bottomRight - above - left + topLeft
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

console.log(
  new NumMatrix([
    [1, 2],
    [3, 4]
  ]).sumRegion(0, 0, 1, 1)
)
// Expected output: 10
// dp = [
//   [0, 0, 0],
//   [0, 1, 3],
//   [0, 4, 10]
// ]

// 1) We calculate ROWS=2, COLS=2 and create dp as a 3×3 array of zeros.
// 2) When filling dp:
//    - dp[1][1] = 1
//    - dp[1][2] = 1+2 = 3
//    - dp[2][1] = 1+3 = 4
//    - dp[2][2] = 1+2+3+4 = 10
// 3) sumRegion(0,0,1,1) sets (r1,c1,r2,c2) to (1,1,2,2):
//    bottomRight  = dp[2][2] = 10
//    above        = dp[0][2] = 0
//    left         = dp[2][0] = 0
//    topLeft      = dp[0][0] = 0
//    result = 10 - 0 - 0 + 0 = 10
// */
