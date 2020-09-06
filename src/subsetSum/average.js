const getSubsets = require('./sumToZero').default;

/**
 * Find all subsets that has given sum
 * @param {array} array - array.
 * @param {number} mean - target sum.
 * @return {array} - max subset.
 */
function getResult(array, mean) {
  let result = [];
  const helper = array.map((item) => item - mean);

  result = getSubsets(helper, 0);
  console.log(result);

  return result;
}

exports.default = getResult;
