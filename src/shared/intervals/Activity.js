/**  represents Activity */
class Activity {
  /**
 * @param {number} start
 * @param {number} end
 */
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  /**
   * @return {string}
   */
  toString() {
    return '[' + this.start + ', ' + this.end + ']';
  }
}

module.exports.Activity = Activity;
