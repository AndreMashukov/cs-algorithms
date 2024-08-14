/**
 * Find subset of a that sums to n.
 * @param {array} array - array.
 * @param {number} sum - target number.
 * @return {array} - max subset.
 */
function getSubsets(array, sum) {
  /**
   * Fork
   * @param {number} i - number.
   * @param {number} s - number.
   * @param {array} t - array.
   */
  function fork(i = 0, s = 0, t = []) {
    if (s === sum) {
      result.push(t);
      return;
    }
    if (i === array.length) {
      return;
    }
    // if (s + array[i] > sum) {
    //   return;
    // }
    if (s + array[i] <= sum) {
      // shout circuit for positive numbers only
      fork(i + 1, s + array[i], t.concat(array[i]));
    }
    fork(i + 1, s, t);
  }

  const result = [];
  fork();

  const objects = result.map((subarray) => {
    const obj = {
      subarray,
      string: subarray
        .sort((a, b) => a - b)
        .reduce((accum, val) => (accum += `${val}`))
    };

    return obj;
  });
  const filteredArray = Object.values(
    objects.reduce((unique, o) => {
      if (!unique[o.string]) {
        unique[o.string] = o.subarray;
      }
      return unique;
    }, {})
  );

  return filteredArray;
}

exports.default = getSubsets;
