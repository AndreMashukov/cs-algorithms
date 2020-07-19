/** Class representing a linked list */
class LinkedListNode {
  // eslint-disable-next-line require-jsdoc
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  // eslint-disable-next-line require-jsdoc
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

module.exports.LinkedListNode = LinkedListNode;
