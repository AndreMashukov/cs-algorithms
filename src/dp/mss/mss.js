/**
 * Dynamic Programming solution.
 * Complexity: O(n)
 *
 * @param {Number[]} inputArray
 * @return {Number[]}
 */
function dpMaximumSubarray(inputArray) {
  // We iterate through the inputArray once,
  // using a greedy approach to keep track of the maximum
  // sum we've seen so far and the current sum.
  //
  // The currentSum variable gets reset to 0 every time it drops below 0.
  //
  // The maxSum variable is set to -Infinity
  // so that if all numbers are negative, the highest
  // negative number will constitute the maximum subarray.

  let maxSum = -Infinity;
  let currentSum = 0;

  // We need to keep track of the starting and ending indices
  // that contributed to our maxSum
  // so that we can return the actual subarray.
  // From the beginning let's assume that whole array
  // is contributing to maxSum.
  let maxStartIndex = 0;
  let maxEndIndex = inputArray.length - 1;
  let currentStartIndex = 0;

  inputArray.forEach((currentNumber, currentIndex) => {
    currentSum += currentNumber;

    // Update maxSum and the corresponding indices if we have found a new max.
    if (maxSum < currentSum) {
      maxSum = currentSum;
      maxStartIndex = currentStartIndex;
      maxEndIndex = currentIndex;
    }

    // Reset currentSum and currentStartIndex if currentSum drops below 0.
    if (currentSum < 0) {
      currentSum = 0;
      currentStartIndex = currentIndex + 1;
    }
  });

  return inputArray.slice(maxStartIndex, maxEndIndex + 1);
}

module.exports.dpMaximumSubarray = dpMaximumSubarray;

// https://backtobackswe.com/platform/content/max-contiguous-subarray-sum/video
// Each cell tells asks a question.
// What is the max subarray we can achieve
//     with a subarray ending at each of these indicies.
// Choices.
//     1. Start a new subarray at a certain item.
//         (cut the previous progress short)
//         the best I can do is to start a new subarray.
//     2. Continue the maximum subarray
//         with the item we are sitting at.
// max(choice1, choice2).
// We are inspecting the item at index i.

// We want to answer the question:
// "What is the Max Contiguous Subarray Sum
//     we can achieve ending at index i?".

// We have 2 choices:
// maxEndingHere + nums[i] (extend the previous
//     subarray best whatever it was)
// 1.) Let the item we are sitting at contribute
//     to this best max we achieved
//     ending at index i - 1.

// nums[i] (start and end at this index)
// 2.) Just take the item we are sitting at's value.

// The max of these 2 choices will be the best answer
//     to the Max Contiguous
// Subarray Sum we can achieve
//     for subarrays ending at index i.

// All the contigous subarrays which end at index i.
//     What is the best subarray we can achieve?
