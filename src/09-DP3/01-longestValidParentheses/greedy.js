/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  let maxLen = 0;
  // scan left to right
  let left = 0;
  let right = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      left++
    } else {
      right++
    }

    if (left === right) {
      maxLen = Math.max(maxLen, 2 * right)
    } else if (right > left) {
      left = right = 0;
    }
  }
  left = right = 0;
  // scan right to left
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "(") {
      left++
    } else {
      right++
    }

    if (left === right) {
      maxLen = Math.max(maxLen, 2 * left)
    } else if (left > right) {
      left = right = 0;
    }
  }


  return maxLen
};