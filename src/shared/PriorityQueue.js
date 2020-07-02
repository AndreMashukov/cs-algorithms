/** Class representing a PriorityQueue. */
class PriorityQueue {
  /**
   * Create a queue.
   * @param {[]} _nodes - vertices
   */
  constructor() {
    this._nodes = [];
  }

  /**
 * Convert a string containing two comma-separated numbers into a point.
 * @param {string} priority - priority.
 * @param {string} key - key.
 */
  enqueue(priority, key) {
    this._nodes.push({key: key, priority: priority});
    this.sort();
  }

  /**
 * @return {string}
 */
  dequeue() {
    return this._nodes.shift().key;
  }

  // eslint-disable-next-line require-jsdoc
  sort() {
    this._nodes.sort(function(a, b) {
      return a.priority - b.priority;
    });
  }

  /**
 * @return {string}
 */
  isEmpty() {
    return !this._nodes.length;
  }
}

module.exports.PriorityQueue = PriorityQueue;
