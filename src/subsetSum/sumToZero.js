/**
 * Find all subsets that has given sum
 * @param {array} array - array.
 * @param {number} sum - target sum.
 * @return {array} - max subset.
 */
function getSubsets(array, sum) {
  const arrMap = new Map();
  array.forEach((item, index) => {
    arrMap.set(index, item);
  });
  const sorted = array.sort((a, b) => a - b);
  arrMap[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
  };
  console.log(arrMap);
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
    let j = start;
    arrMap.forEach((value, key) => {
      if ((j >= arrA.length) || (currSum + arrA[j]) > sum) {
        return;
      }
      combinationList.push(arrA[j]);
      combinationUtil(arrA, currSum + arrA[j], j + 1, combinationList);
      combinationList.splice(combinationList.length - 1, 1);
      j++;
    });
  }
}

exports.default = getSubsets;
