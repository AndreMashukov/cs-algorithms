/**
 * Find and print the number of cells
 * in the largest region in the matrix
 * @param {array} matrix - matrix of integers
 * @return {number} - number of cells in the largest
 * region in the given matrix.
 */
function connectedCell(matrix) {
  const len = matrix.length;
  const regions = [];
  const visited = new Set();
  const traverse = function(x, y, current = []) {
    if (!matrix[x]) return; // out of bounds
    const cell = matrix[x][y];
    if (cell) {
      if (visited.has(x + '_' + y)) {
        return;
      }
      // Check all neighbours
      visited.add(x + '_' + y);
      current.push(x + '_' + y);
      traverse(x + 1, y + 1, current);
      traverse(x + 1, y, current);
      traverse(x + 1, y - 1, current);
      traverse(x, y + 1, current);
      traverse(x, y - 1, current);
      traverse(x - 1, y + 1, current);
      traverse(x - 1, y, current);
      traverse(x - 1, y - 1, current);
      return current;
    }
  };

  // Test this for all matrix nodes
  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      if (!visited.has(x+'_'+y)) {
        const region = traverse(x, y);
        if (region) {
          regions.push(region);
        }
      }
    }
  }

  // Return the global max
  return regions.map((region) => region.length)
      .sort((a, b) => b - a)[0];
}

module.exports.connectedCell = connectedCell;

// Consider a matrix where each cell contains either a 0 or a 1.
// Any cell containing a 1 is called a filled cell.
// Two cells are said to be connected
// if they are adjacent to each other horizontally,
// vertically, or diagonally. In the following grid,
// all cells marked X are connected to the cell marked Y.

// XXX
// XYX
// XXX

// If one or more filled cells are also connected,
// they form a region. Note that each cell
// in a region is connected to zero or more cells
// in the region but is not necessarily
// directly connected to all the other cells
// in the region.
