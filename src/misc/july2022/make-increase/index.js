/**
 * @param {*[]} permutationOptions
 * @return {*[]}
 */
function permutateWithoutRepetitions (permutationOptions) {
  if (permutationOptions.length === 1) {
    return [permutationOptions]
  }

  // Init permutations array.
  const permutations = []

  // Get all permutations for permutationOptions
  // excluding the first element.
  const smallerPermutations = permutateWithoutRepetitions(
    permutationOptions.slice(1)
  )

  // Insert first option into every possible position
  // of every smaller permutation.
  const firstOption = permutationOptions[0]

  for (
    let permIndex = 0;
    permIndex < smallerPermutations.length;
    permIndex += 1
  ) {
    const smallerPermutation = smallerPermutations[permIndex]

    // Insert first option into every possible position
    // of smallerPermutation.
    for (
      let positionIndex = 0;
      positionIndex <= smallerPermutation.length;
      positionIndex += 1
    ) {
      const permutationPrefix = smallerPermutation.slice(0, positionIndex)
      const permutationSuffix = smallerPermutation.slice(positionIndex)
      permutations.push(
        permutationPrefix.concat([firstOption], permutationSuffix)
      )
    }
  }

  return permutations
}

/**
 * @param {[]} nums
 * @return {[][]}
 */
function permuteNumbers (nums) {
  const res = []
  permutations(nums, [])
  return res

  /**
   * @param {[]} nums
   * @param {[][]} ans
   */
  function permutations (nums, ans) {
    if (nums.length == 0) {
      res.push(ans)
      return
    }
    for (let i = 0; i < nums.length; ++i) {
      const k = nums[i]
      nums.splice(i, 1)
      permutations(nums, [...ans, k])
      nums.splice(i, 0, k)
    }
  }
}

const checkIfStrictIncr = (list) => {
  let result = list[0]
  for (let i = 1; i < list.length; i++) {
    if (list[i] > result) {
      result = list[i]
    } else {
      return false
    }
  }
  return true
}

const swap = ({ element, next, prev }) => {
  // number = 900, target = 10

  const array = `${element}`
    .split('')
    .map((n) => parseInt(n, 10))
    .sort((a, b) => {
      if (a > b) {
        return 1
      }
      if (a < b) {
        return -1
      }
      if (a === b) {
        return 0
      }
    })
  // array = [0, 0, 9]
  const perms = permuteNumbers(array).map((item) =>
    parseInt(item.join(''), 10)
  )
  console.log(perms)
  if (perms.length === 1) {
    return [element]
  } else {
    if (!prev) {
      return perms.filter((item) => item < next)
    } else {
      return perms.filter((item) => item < next && item > prev)
    }
  }
}
const naive = (numbers) => {
  if (checkIfStrictIncr(numbers)) {
    return true
  } else {
    for (let i = 0; i < numbers.length; i++) {
      const copy = [...numbers]
      // only for 2 digit and higher numbers
      if (copy[i] > 9) {
        // check if next current number has permutations
        // which are less then its next number
        const perms = swap({
          element: copy[i],
          next: numbers[i + 1],
          prev: numbers[i - 1]
        })
        console.log({ perms })
        for (const p of perms) {
          copy[i] = p
          console.log(copy)
          if (checkIfStrictIncr(copy)) {
            return true
          }
        }
      }
    }
    return false
  }
}
module.exports.makeIncrease = { naive }
