// 895. Maximum Frequency Stack
// https://leetcode.com/problems/maximum-frequency-stack/
// https://www.youtube.com/watch?v=Z6idIicFDOE&t=623s
// Design a stack-like data structure to push elements
// to the stack and pop the most frequent element from the stack.

// Implement the FreqStack class:

// FreqStack() constructs an empty frequency stack.
// void push(int val) pushes an integer val onto the top of the stack.
// int pop() removes and returns the most frequent element in the stack.
// If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.

// Example 1:

// Input
// ["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
// [[], [5], [7], [5], [7], [4], [5], [], [], [], []]
// Output
// [null, null, null, null, null, null, null, 5, 7, 5, 4]

const FreqStack = function () {
  this.cnt = {}
  this.maxCnt = 0
  this.st = {}
}

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  const valCnt = 1 + this.cnt[val] || 0
  this.cnt[val] = valCnt
  if (valCnt > this.maxCnt) {
    this.maxCnt = valCnt
    this.st[valCnt] = []
  }
  this.st[valCnt].push(val)
}

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  const stack = this.st[this.maxCnt]
  const val = stack.pop()
  if (!stack.length) {
    this.maxCnt--
  }
  this.cnt[val]--
  return val
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

// 5 7 5 7 4 5
// st = {1: [4], 2: [7], 3: [5]}
// cnt = {4: 1, 7: 2, 5: 3}
// maxCnt = 3

module.exports = FreqStack
