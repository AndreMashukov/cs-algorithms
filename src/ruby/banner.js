const btps = require('../sets/btPowerSet');
const cwr = require('../sets/combWithoutRep');
/**
 * Solution for banner problem
 *
 * @param {array} h - Array of heights
 * @return {number} - min banner size
 */
function calcBannerSize(h) {
  const object = h.map((height, index) => {
    const o = {
      height,
      index,
    };
    return o;
  });
  const sets = btps.btPowerSet(new Array(h.length)
      .fill(0)
      .map((val, index) => index))
      .filter((item) => item.length > 0)
      .filter((item) => diff(item).every((val) => val === 1));

  return cwr.combineWithoutRepetitions(sets, 2)
      .filter((pair) => {
        const intersect = pair[0].filter((value) => pair[1].includes(value));
        return (intersect.length === 0 &&
        (pair[0].length + pair[1].length === h.length));
      })
      .map((pair) => {
        // console.log(pair);
        const obj = {
          pair,
          size: calcSize(pair[0]) + calcSize(pair[1]),
        };
        return obj;
      })
      .sort((a, b) => a.size - b.size)[0].size;

  /**
 * Sizes
 * @param {array} arr - Array of heights
 * @return {number} - size
 */
  function calcSize(arr) {
    return arr.map((val) => object[val].height)
        .sort((a, b) => b - a)[0] * (arr.length);
  }
};

/**
 * Differences
 * @param {array} arr - Array of heights
 * @return {number} - size
 */
function diff(arr) {
  const diffs = [];
  for (let i = 1; i < arr.length; i++) {
    diffs.push(arr[i] - arr[i - 1]);
  }

  return diffs;
}

exports.default = calcBannerSize;

