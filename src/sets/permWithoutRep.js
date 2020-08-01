/**
 * @param {*[]} permutationOptions
 * @return {*[]}
 */
function permutateWithoutRepetitions(permutationOptions) {
  if (permutationOptions.length === 1) {
    return [permutationOptions];
  }

  // Init permutations array.
  const permutations = [];

  // Get all permutations for permutationOptions
  // excluding the first element.
  const smallerPermutations = permutateWithoutRepetitions(
      permutationOptions.slice(1));

  // Insert first option into every possible position
  // of every smaller permutation.
  const firstOption = permutationOptions[0];

  for (let permIndex = 0; permIndex <
    smallerPermutations.length; permIndex += 1) {
    const smallerPermutation = smallerPermutations[permIndex];

    // Insert first option into every possible position
    // of smallerPermutation.
    for (let positionIndex = 0; positionIndex <=
        smallerPermutation.length; positionIndex += 1) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex);
      const permutationSuffix = smallerPermutation.slice(positionIndex);
      permutations.push(permutationPrefix.concat(
          [firstOption], permutationSuffix));
    }
  }

  return permutations;
}

module.exports.permutateWithoutRepetitions = permutateWithoutRepetitions;
module.exports.permuteNumbers = permuteNumbers;

/**
 * @param {[]} nums
 * @return {[][]}
 */
function permuteNumbers(nums) {
  const res = [];
  permutations(nums, []);
  return res;

  /**
   * @param {[]} nums
   * @param {[][]} ans
   */
  function permutations(nums, ans) {
    if (nums.length == 0) {
      res.push(ans);
      return;
    }
    for (let i = 0; i < nums.length; ++i) {
      const k = nums[i];
      nums.splice(i, 1);
      permutations(nums, [...ans, k]);
      nums.splice(i, 0, k);
    }
  }
};
