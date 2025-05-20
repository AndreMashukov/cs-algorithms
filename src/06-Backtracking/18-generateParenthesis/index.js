// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
// https://leetcode.com/problems/generate-parentheses/description
// https://www.youtube.com/watch?v=s9fokUqJ76A

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  const res = [];

  const generate = (left, right, str) => {
    if (left === n && right === n) {
      res.push(str);
    }

    if (left < n) {
      generate(left + 1, right, str + '(');
    }

    if (right < left) {
      generate(left, right + 1, str + ')');
    }
  };

  generate(0, 0, '');
  return res;
};
