// Given an integer array nums, return all the triplets
//  [nums[i], nums[j], nums[k]]
// such that i != j, i != k, and j != k,
// and nums[i] + nums[j] + nums[k] == 0.

const solution = (nums) => {
  nums.sort((a, b) => a - b)
  const result = []

  for (let i = 0; i < nums.length - 2; i++) {
    // The condition i === 0 checks if the current element
    // is the first element in the array. If it is,
    // the element is used because there are no previous elements to compare it with.
    if (i === 0 || (i > 0 && nums[i] !== nums[i - 1])) {
      let low = i + 1
      let high = nums.length - 1
      const sum = 0 - nums[i]

      while (low < high) {
        if (nums[low] + nums[high] === sum) {
          result.push([nums[i], nums[low], nums[high]])

          while (low < high && nums[low] === nums[low + 1]) {
            low++
          }

          while (low < high && nums[high] === nums[high - 1]) {
            high--
          }

          low++
          high--
        } else if (nums[low] + nums[high] < sum) {
          low++
        } else {
          high--
        }
      }
    }
  }

  return result
}

// Sure, let's consider a simple example with the array
// nums = [-1, 0, 1, 2, -1, -4]
// and we want to find all unique triplets that sum up to zero.

// First, the array is sorted to become nums = [-4, -1, -1, 0, 1, 2].

// The algorithm starts with the first number -4.
// It sets low to the index after -4 (which is -1)
// and high to the last index (which is 2).

// It checks if the sum of -4, -1, and 2 is zero.
// It's not (it's -3), so it increments low to point to the next -1.

// It checks if the sum of -4, -1, and 2 is zero.
// It's not (it's -3), so it increments low to point to 0.

// It checks if the sum of -4, 0, and 2 is zero.
// It's not (it's -2), so it increments low to point to 1.

// It checks if the sum of -4, 1, and 2 is zero.
// It's not (it's -1), so low has gone past high
// and it moves on to the next number.

// The next number is -1, but it's the same as the previous number,
// so it's skipped to avoid duplicates.

// The next number is the other -1. It sets low to 0 and high to 2.

// It checks if the sum of -1, 0, and 2 is zero.
// It is, so the triplet [-1, 0, 2] is added to the result.

// It tries to move low and high to the next different numbers,
// but there are none, so it moves on to the next number.

// The next numbers are 0, 1, and 2, but low would be equal to or past high for all of them, so no more triplets are found.

// The final result is [[ -1, 0, 2 ]], which is the only unique triplet in nums that sums up to zero.
