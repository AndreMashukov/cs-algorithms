/**
 * Given an array, find all unique subsets with a given sum
 * with allowed repeated digits.
 * @param {array} array - an array
 * @param {number} sum - target sum
 * @return {array} - unique sets
 */
function findSets(array, sum) {
  const sorted = array.sort((a, b) => a - b);
  const result = [];
  combinationUtil(sorted, sum, 0, 0, []);

  return result;

  /**
 * Make a recursive call with startIndex (to process next elements)
 * and combinationList.
 * @param {array} arrA - an array
 * @param {number} sum - target sum
 * @param {number} currSum - current sum
 * @param {number} startIndex - start index
 * @param {array} combinationList - combinationList
 */
  function combinationUtil(arrA, sum, currSum, startIndex, combinationList) {
    console.log(combinationList);
    if (currSum === sum) {
      result.push(combinationList);
    }
    for (let i = startIndex; i < arrA.length; i++) {
    // array is sorted, no need to check further
      if (currSum + arrA[i] > sum) {
        break;
      }
      combinationList.push(arrA[i]);
      combinationUtil(arrA, sum, currSum + arrA[i], i, combinationList);
      combinationList.splice(combinationList.length - 1, 1);
    }
  }
}

exports.default = findSets;

// 1. Given arrA[] and sum.
// 2. Sort the arrA[] in ascending order.
// 3. Start with currSum = 0, startIndex = 0, combinationList=null
// 4. Iterate through i = startIndex to length(arrA[]).
//  @. Add arrA[i] to currSum.
//  @. Put arrA[i] to combinationList.
//  @.  Make a recursive call with startIndex
//      (to process next elements) and combinationList.
//  @. In tail recursion, backtrack and remove arrA[i]
//      from the combinationList to find more solutions
//  @. Base case: if currSum=sum,  Print combinationList
