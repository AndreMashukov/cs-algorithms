const lcs = require('./longestCommonSubsequence');
// A string is said to be a child of a another string
// if it can be formed by deleting 0 or more characters
// from the other string. Given two strings of equal length,
// what's the longest string that can be constructed
// such that it is a child of both?

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
function commonChild(s1, s2) {
  const arr = [Array(s2.length + 1).fill(0)];
  [...s1].forEach((v1, i) => {
    arr[i + 1] = [0];
    [...s2].forEach((v2, j) => {
      arr[i + 1][j + 1] = v1 === v2 ?
              arr[i][j] + 1 : Math.max(arr[i + 1][j], arr[i][j + 1]);
    });
  });
  return arr[s2.length][s1.length];
}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {string}
 */
function commonChildLcs(s1, s2) {
  return lcs.longestCommonSubsequence([...s1], [...s2]).length;
}

module.exports.commonChild = commonChild;
module.exports.commonChildLcs = commonChildLcs;
