/**
 * It should return an array of lands
 * @param {matrix} arr - multi dimensional array.
 * @return {array} - lands found
 */
function findLand(arr) {
  const lands = [];
  // the current group
  const visited = new Set;
  // coords we've seen (set is quicker to lookup).

  // iterate the rows AND columns
  for (let i=0; i<arr.length; i++) {
    for (let j=0; j < arr[i].length; j++) {
      if (visited.has(i+'_'+j)) {
        continue;
      }
      // don't call function on visited coords
      const land = traverse(i, j);
      if (land) {
        // land will be undefined if traverse returns undefined
        lands.push(land);
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
    if (x<0 || y<0 || x > arr.length-1 || y > arr[0].length-1) {
      return;
    }
    if (arr[x][y]!=1 || visited.has(x+'_'+y)) {
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

module.exports.findLand = findLand;
