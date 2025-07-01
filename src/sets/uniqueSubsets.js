// Given an array, print all unique subsets with a given sum.
// Objective: Given an array of integers and number N,
// Write an algorithm to find and print all the subsets
// of the array for which sum is equal to N.

// input [] = {1,2,3,4,5,6};
// Sum = 6
// [1, 2, 3]
// [1, 5]
// [2, 4]
// [6].

/**
 * @param {[]} arrA
 * @param {number} sum
 * @return {[][]}
 */
function findSets (arrA, sum) {
  const sorted = arrA.sort((a1, a2) => a1 - a2)
  const combinationList = []
  const uniqueSets = []
  combinationUtil(sorted, sum, 0, 0, combinationList)
  return uniqueSets

  /**
 * @param {[]} arrA
 * @param {number} sum
 * @param {number} currSum
 * @param {number} start
 * @param {[]} combinationList
 */
  function combinationUtil (arrA, sum, currSum, start, combinationList) {
    if (currSum === sum) {
      uniqueSets.push([...combinationList])
      return
    }

    let prevElement = -1
    for (let i = start; i < arrA.length; i++) {
      if (prevElement !== arrA[i]) {
        // avoids duplicates by keeping track of the previous element in the sorted array and skipping the current element if it's the same as the previous one
        // array is sorted, no need to check further
        if (currSum + arrA[i] > sum) {
          break
        }
        combinationList.push(arrA[i])
        combinationUtil(arrA, sum, currSum + arrA[i], i + 1, combinationList)
        //  backtrack and explore other subsets that do not include the current element.
        combinationList.splice(combinationList.length - 1, 1)
        prevElement = arrA[i]
      }
    }
    // console.log(combinationList);
  }
}

exports.default = findSets

// Given arrA[] and sum.
// 1. Sort the arrA[] in ascending order.
// 2. Start with currSum = 0, start = 0, combinationList=null
// 3. Iterate through i = start to length(arrA[]).
// 3.1. Add arrA[i] to currSum.
// 3.2. Put arrA[i] to combinationList.
// 3.3. Make a recursive call with start = start + 1
// (to process next elements) and combinationList.
// 3.4. In tail recursion, backtrack and remove arrA[i]
// from the combinationList to find more solutions
// 3.5. Base case: if currSum=sum, Print combinationList.
// 3.6. During iteration, if the current element is the same
// as the previous element then skip the current element.
// (this step is required to avoid duplicate results
// in case array has duplicate elements,
// sorting will bring them together so skip one of the element,
// for example, array is [1, 1, 4], sum = 5,
// then the results would be [1, 4] and [1, 4]
// if we use both the 1’s but it produces identical results,
// so consider only one element.).

// For example, consider an array [1, 1, 4] and a target sum of 5.
// The subsets that add up to 5 are [1, 4] and [1, 4].
// These subsets are identical, so we only need to consider one of them.
// By skipping the second 1 in the array,
// the algorithm ensures that it only generates unique subsets.
