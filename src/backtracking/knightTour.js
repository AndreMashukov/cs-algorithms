/**
 * Solves Knight’s Tour Problem for nxn matrix.
 * @param {number} n - graph we're going to traverse.
 * @return {matrix} - matrix filled with steps.
 */
function solve(n) {
  const solution = Array(n).fill(0).map((x) => Array(n).fill(0));
  const matrix = findPath(0, 0, 0, solution.length);
  return matrix ? matrix : -1;
}

module.exports.solve = solve;
