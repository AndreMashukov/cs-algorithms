/**  represents Activity */
class Coordinate {
  /**
 * @param {number} x1
 * @param {number} x2
 */
  constructor(x1, x2) {
    this.x1 = x1;
    this.x2 = x2;
  }
  /**
 * @return {string}
 */
  toString() {
    return '[' + this.x1 + ',' + this.x2 + ']';
  }
}

module.exports.Coordinate = Coordinate;
