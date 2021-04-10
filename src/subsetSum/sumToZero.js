/**
 * consecutive
 * @param {array} array - array.
 * @return {boolean} - true if vconsecutive
 */
function consecutive(array) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = -Number.MAX_SAFE_INTEGER;

  // compute the minimum and maximum element in an array
  for (const i of array) {
    if (i < min) {
      min = i;
    }
    if (i > max) {
      max = i;
    }
  }

  // for an array to contain consecutive integers, the difference between
  // the maximum and minimum element in it should be exactly `n-1`
  if (max - min != array.length - 1) {
    return false;
  }

  // create an empty set (we can also use a visited array)
  const visited = new Set();

  // traverse the array and checks if each element appears only once
  for (const i of array) {
    // if an element is seen before, return false
    if (visited.has(i)) {
      return false;
    }

    // mark element as seen
    visited.add(i);
  }

  // we reach here when all elements in the array are distinct
  return true;
}

/**
 * check if values in array form a contiguos subarray.
 * @param {array} array - array.
 * @param {map} map - Mapping: index - value
 * @return {boolean} - true if values form a contiguos subarray
 */
function checkIfSequential(array, map) {
  const subarrayToIndex = array.map((subarray) => {
    return subarray.map((subarrayItem) => {
      const index = [...map.entries()].filter(
          (entry) => entry[1] === subarrayItem,
      );
      return index[0][0];
    });
  });
  return subarrayToIndex.map((subarray) => consecutive(subarray));
}

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
  const result = [];
  const combinationList = [];
  combinationUtil(sorted, 0, 0, combinationList);
  const ifSeq = checkIfSequential(result, arrMap);
  return result.filter((val, index) => ifSeq[index]);
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
      if (j >= arrA.length || currSum + arrA[j] > sum) {
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
