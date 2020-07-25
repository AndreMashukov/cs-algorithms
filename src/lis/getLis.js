/**
 * Returns longest increasing subsequence.
 * @param {array} array
 * @return {array} longest incr. subseq.
 */
function longestIncreasingSubsequence(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('function argument should be an Array');
  }

  const findSequence = (array) => {
    let index = 0;
    const sequencePositions = [index];
    for (let i = 1; i < array.length; i++) {
      if (array[i] < array[sequencePositions[index]]) {
        for (let j = 0; j <= index; j++) {
          if (array[i] < array[sequencePositions[j]] && (!j || array[i] >
              array[sequencePositions[j - 1]])) {
            sequencePositions[j] = i;
            break;
          }
        }
      } else if (array[i] > array[sequencePositions[index]] ||
          (array[i] === array[sequencePositions[index]])) {
        sequencePositions[++index] = i;
      }
    }
    return sequencePositions;
  };

  const createSequenceArray = (array, sequencePositions) => {
    const index = sequencePositions.length - 1;
    const longestIncreasingSubsequence = [];
    longestIncreasingSubsequence[index] = array[sequencePositions[index]];
    for (let i = index - 1; i >= 0; i--) {
      if (sequencePositions[i] < sequencePositions[i + 1]) {
        longestIncreasingSubsequence[i] = array[sequencePositions[i]];
      } else {
        for (let j = sequencePositions[i + 1] - 1; j >= 0; j--) {
          if (array[j] >= array[sequencePositions[i]] && array[j] <=
              array[sequencePositions[i + 1]]) {
            longestIncreasingSubsequence[i] = array[j];
            sequencePositions[i] = j;
            break;
          }
        }
      }
      // console.log(longestIncreasingSubsequence);
    }
    return longestIncreasingSubsequence;
  };

  const sequencePositions = findSequence(array);
  // console.log('sequencePositions', sequencePositions);
  const longestIncreasingSubsequence = createSequenceArray(
      array, sequencePositions);

  return longestIncreasingSubsequence;
}

module.exports.longestIncreasingSubsequence = longestIncreasingSubsequence;
