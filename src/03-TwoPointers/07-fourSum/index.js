// Description
// Given an array S of n integers, are there elements a, b, c,
// and d in S such that a + b + c + d = target?

// Find all unique quadruplets in the array which gives the sum of target.

export class Solution {
  /**
   * @param numbers: Give an array
   * @param target: An integer
   * @return: Find all unique quadruplets in the array which gives the sum of zero
   *          we will sort your return value in output
   */
  fourSum (numbers, target) {
    if (!numbers || numbers.length < 4) {
      return []
    }

    numbers.sort((a, b) => a - b)

    const result = []
    const len = numbers.length

    for (let i = 0; i < len - 3; i++) {
      if (i > 0 && numbers[i] === numbers[i - 1]) {
        continue
      }
      for (let j = i + 1; j < len - 2; j++) {
        if (j > i + 1 && numbers[j] === numbers[j - 1]) {
          continue
        }
        let left = j + 1
        let right = len - 1
        while (left < right) {
          const sum = numbers[i] + numbers[j] + numbers[left] + numbers[right]
          if (sum === target) {
            result.push([numbers[i], numbers[j], numbers[left], numbers[right]])
            while (left < right && numbers[left] === numbers[left + 1]) {
              left++
            }
            while (left < right && numbers[right] === numbers[right - 1]) {
              right--
            }
            left++
            right--
          } else if (sum < target) {
            left++
          } else {
            right--
          }
        }
      }
    }
  }
}
