/**
 * Find all subsets that has given mean
 * @param {array} array - array.
 * @param {number} mean - target mean.
 * @return {array} - max subset.
 */
function getSubsets(array, mean) {
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
    console.log(arrA);
    const l = combinationList.length;
    if (currSum === mean && l > 0) {
      result.push([...combinationList]);
      return;
    }

    for (let i = start; i < arrA.length; i++) {
      // array is sorted, no need to check further
      if ((currSum + arrA[i]) > mean) {
        break;
      }

      combinationList.push(arrA[i]);
      combinationUtil(arrA, currSum + arrA[i], i + 1, combinationList);
      combinationList.splice(combinationList.length - 1, 1);
    }
  }
}

exports.default = getSubsets;
