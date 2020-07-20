/**
 * Find and print the number of cells
 * in the largest region in the matrix
 * @param {array} matrix - matrix of integers
 * @return {number} - number of cells in the largest
 * region in the given matrix.
 */
function connectedCell(matrix) {
  let max = 0;
  const len = matrix.length;
  const regions = [];
  const checkIfOnRegion = function(x, y, regionId = undefined) {
    if (!matrix[x]) return; // out of bounds
    const m = matrix[x][y];
    if (m) {
      matrix[x][y] = 0; // Set it as visited
      // If is a new independent node and we are starting a region
      if (undefined === regionId) {
        regionId = regions.length;
        regions.push(0);
      }
      // Track the amout of entries in this region
      regions[regionId]++;
      // Update max
      if (regions[regionId] > max) max = regions[regionId];
      // Check all neighbours
      checkIfOnRegion(x + 1, y + 1, regionId);
      checkIfOnRegion(x + 1, y, regionId);
      checkIfOnRegion(x + 1, y - 1, regionId);
      checkIfOnRegion(x, y + 1, regionId);
      checkIfOnRegion(x, y - 1, regionId);
      checkIfOnRegion(x - 1, y + 1, regionId);
      checkIfOnRegion(x - 1, y, regionId);
      checkIfOnRegion(x - 1, y - 1, regionId);
    }
  };

  // Test this for all matrix nodes
  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      checkIfOnRegion(x, y);
    }
  }
  // Return the global max
  return max;
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
