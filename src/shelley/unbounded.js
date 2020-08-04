const cwr = require('../../src/sets/combWithRep');

// eslint-disable-next-line require-jsdoc
function sumUpPartials(arr, target) {
  let result = 0;
  for (let i = 1; i <= arr.length; i ++) {
    const sum = sumUp(arr.slice(0, i));
    if (sum > result && sum <= target) {
      result = sum;
    }
  }
  return result;
}

// eslint-disable-next-line require-jsdoc
function sumUp(arr) {
  return arr.reduce((accum, value) => {
    accum += parseInt(value, 0);
    return accum;
  }, 0);
}

// eslint-disable-next-line require-jsdoc
function closestByCombos(array, target, times) {
  let closest = 0;
  for (let i = 0; i < times; i++) {
    const repetitions = cwr.combineWithRepetitions(array, array.length + i);
    const sums = [];
    const result = repetitions.reduce((sumToTarget, array) => {
      const sum = sumUpPartials(array, target);
      if (sum <= target) {
        sumToTarget = sum;
        sums.push(sumToTarget);
      }
      return Math.max(...sums);
    }, 0);

    if (result > closest && result <= target) {
      closest = result;
      if (closest === target) {
        return closest;
      }
    }
  }
  return closest;
}

/**
 * Print the maximum sum for each test case which is as near as possible,
 * but not exceeding, to the target sum on a separate line.
 * @param {number} target - k: an integer
 * @param {array} arr - arr: an array of integers
 * @return {object} - the sum nearest to without exceeding the target value.
 */
function unboundedKnapsack(target, arr) {
  const sorted = arr.sort((a, b) => a - b)
      .map((val) => `${val}`);
  const accum = closestByCombos(sorted, target, 2);
  return accum;
}

module.exports.unboundedKnapsack = unboundedKnapsack;

// Given an array of integers and a target sum,
// determine the sum nearest to but not exceeding
// the target that can be created.
// To create the sum,
// use any element of your array zero or more times.
