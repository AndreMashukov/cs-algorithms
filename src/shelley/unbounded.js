const shelley = require('./shelley');


// eslint-disable-next-line require-jsdoc
function multiplyAtIndex(arr, index, times) {
  const newArr = [];
  newArr.push(arr[index]);
  arr.forEach((val, ind) => {
    if (ind === index) {
      for (let i = 0; i < times; i++) {
        newArr.push(val);
      }
    } else {
      // newArr.push(val);
    }
  });
  return newArr;
}
/**
 * Print the maximum sum for each test case which is as near as possible,
 * but not exceeding, to the target sum on a separate line.
 * @param {number} target - k: an integer
 * @param {array} arr - arr: an array of integers
 * @return {object} - the sum nearest to without exceeding the target value.
 */
function unboundedKnapsack(target, arr) {
  const sorted = arr.sort((a, b) => a - b);
  const items = sorted.map((val) => {
    const item = {w: 1, v: val};
    return item;
  });

  return items.reduce((accum, val, ind) => {
    const numTimes = Math.floor(target/val.v);
    let result;
    for (let i = 0; i < numTimes; i++) {
      result = shelley.knapsack(
          multiplyAtIndex(items, ind, i), target);
      if (result.maxValue > accum && result.maxValue <= target) {
        accum = result.maxValue;
        if (accum === target) {
          return accum;
        }
      }
    }
    return accum;
  }, 0);
}

module.exports.unboundedKnapsack = unboundedKnapsack;
