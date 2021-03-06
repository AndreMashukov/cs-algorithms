/**
 * It should return an array of lands
 * @param {matrix} matrix - multi dimensional array.
 * @return {array} - lands found
 */
function findLand(matrix) {
  const lands = [];
  // the current group
  const visited = new Set;
  // coords we've seen (set is quicker to lookup).

  // iterate the rows AND columns
  for (let i=0; i<matrix.length; i++) {
    for (let j=0; j < matrix[i].length; j++) {
      if (!visited.has(i+'_'+j)) {
        // don't call function on visited coords
        const land = traverse(i, j);
        if (land) {
        // land will be undefined if traverse returns undefined
          lands.push(land);
        }
      }
    }
  }
  /**
   * Traversing the matrix
   * @param {number} x - start x.
   * @param {number} y -start y.
   * @param {array} current - cells.
   * @return {array} - current cells
   */
  function traverse(x, y, current = []) { // keep current local
    if (x<0 || y<0 || x > matrix.length-1 || y > matrix[0].length-1) {
      return;
    }
    if (matrix[x][y]!=1 || visited.has(x+'_'+y)) {
      return;
    }
    current.push(x+'_'+y);
    visited.add(x+'_'+y);
    traverse(x, y+1, current);
    traverse(x, y-1, current);
    traverse(x-1, y, current);
    traverse(x+1, y, current);
    return current;
    // should hold one complete land mass
  }
  return lands;
}

exports.default = findLand;
