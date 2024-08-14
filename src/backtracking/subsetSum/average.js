const getSubsets = require('./sumToZero').default;

/**
 * Find all subsets that has given mean
 * @param {array} array - array.
 * @param {number} mean - target mean.
 * @return {array} - result subsets.
 */
function getResult(array, mean) {
  let result = [];
  const helper = array.map((item) => item - mean);

  result = getSubsets(helper, 0);
  // console.log(result);

  return result;
}

exports.default = getResult;
