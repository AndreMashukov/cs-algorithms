/**
 * Find all subsets that has given sum
 * @param {array} array - array.
 * @param {number} sum - target sum.
 * @return {array} - max subset.
 */
function getSubsets(array, sum) {
  const sorted = array.sort((a, b) => a - b);
  const result = [];
  const combinationList = [];
  combinationUtil(sorted, 0, 0, combinationList);
  return result;
  /**
   * Fork
   * @param {array} arrA - array.
   * @param {number} currSum - current sum
   * @param {number} start - start index
   * @param {array} combinationList - list of subsets.
   */
  function combinationUtil(arrA, currSum, start, combinationList) {
    const l = combinationList.length;
    if (currSum === sum && l > 0) {
      result.push([...combinationList]);
      return;
    }

    for (let i = start; i < arrA.length; i++) {
      // array is sorted, no need to check further
      if ((currSum + arrA[i]) > sum) {
        break;
      }

      combinationList.push(arrA[i]);
      combinationUtil(arrA, currSum + arrA[i], i + 1, combinationList);
      combinationList.splice(combinationList.length - 1, 1);
    }
  }
}

exports.default = getSubsets;
