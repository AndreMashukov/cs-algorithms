/**
 * @param {[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = (matrix) => {
  if (!matrix || matrix.length === 0) {
    return 0;
  }

  // direction array
  const direct = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  // global maximum
  let max = 1;
  const width = matrix[0].length;
  // deep = matrix.length;
  const deep = matrix.length;
  // dp two-dimensional array,
  // save the maximum path length
  // of each point as a starting point
  const dp = Array(deep).fill(0).map((x) => Array(width).fill(0));
  let finalMatrix;

  const dfs = function(i, j) {
    if (dp[i][j] > 0) {
      return dp[i][j];
    }
    let mx = 1;
    for (let k = 0; k < direct.length; k++) {
      const x = i + direct[k][0];
      const y = j + direct[k][1];
      if (x < 0 || x >= deep || y < 0 || y >= width) {
        // skip over range
        continue;
      }
      if (matrix[x][y] <= matrix[i][j]) {
        // is not an incremental skip
        continue;
      }
      const len = dfs(x, y) + 1;
      mx = Math.max(mx, len);
    }
    dp[i][j] = mx;
    return mx;
  };
  for (let i = 0; i < deep; i++) {
    for (let j = 0; j < width; j++) {
      max = Math.max(max, dfs(i, j));
    }
  }
  return max;
};

module.exports.longestIncreasingPath = longestIncreasingPath;

// [0, 1, 2],
// [3, 3, 3], =>
// [ [ 4, 3, 2 ], [ 1, 1, 1 ] ] =>
// ['0_0', '0_1', '0_2', '1_0']
