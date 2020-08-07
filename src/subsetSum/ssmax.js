// To enforce the rule that you want to prefer
// higher values first,
// pass this function an array of values
// that is pre-sorted in descending order.
// 1. [1, 7, 11]
// 2. [3, 5, 11]
// 3. [9, 7, 3]

const getSubsets = require('./ssp').default;

/**
 * Compares values in array
 * @param {number} a - first.
 * @param {number} b - second.
 * @param {number} index - index.
 * @return {number} - integer that is greater/less than 0
 */
function comparator(a, b) {
  if (a[0] < b[0]) {
    return 1;
  } else if (a[0] > b[0]) {
    return -1;
  } else {
    return b[1] - a[1];
  }
  return 0;
}

/**
 * Find subset of a that sums to n.
 * @param {array} array - array.
 * @param {number} sum - target number.
 * @return {array} - max subset.
 */
const subsetSumMax = (array, sum) => {
  const subsets = getSubsets(array, sum).map((subarray) =>
    subarray.sort((a, b) => b - a),
  );

  const minLength = subsets.reduce((accum, valArray) => {
    if (accum > valArray.length) {
      accum = valArray.length;
    }
    return accum;
  }, subsets[0].length);

  const minLengthSubsets = subsets.filter((s) => s.length === minLength);
  return minLengthSubsets.sort((s1, s2) => comparator(s1, s2))[0];
};

module.exports.subsetSumMax = subsetSumMax;
