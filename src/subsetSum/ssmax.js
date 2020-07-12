// To enforce the rule that you want to prefer
// higher values first,
// pass this function an array of values
// that is pre-sorted in descending order.
// 1. [1, 7, 11]
// 2. [3, 5, 11]
// 3. [9, 7, 3]

const ssp = require('./ssp');

/**
 * Compares values in array
 * @param {number} a - first.
 * @param {number} b - second.
 * @param {number} index - index.
 * @return {number} - integer that is greater/less than 0
 */
function comparator(a, b, index) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
}

/**
 * Find subset of a that sums to n.
 * @param {array} array - array.
 * @param {number} sum - target number.
 * @return {array} - max subset.
 */
const subsetSumMax = (array, sum) => {
  const subsets = ssp.getSubsets(array, sum);

  const minLength = subsets.reduce((accum, valArray) => {
    if (accum > valArray.length) {
      accum = valArray.length;
    }
    return accum;
  }, subsets[0].length);

  const minLengthSubsets = subsets.filter((s) => s.length === minLength);
  return minLengthSubsets
      .map((s) => s.sort((a, b) => b - a))
      .map((s) => s.sort(comparator))[0];
};

module.exports.subsetSumMax = subsetSumMax;
