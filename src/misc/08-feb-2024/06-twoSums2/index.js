// Given a 1-indexed array of integers numbers that is already sorted
// in non-decreasing order,
// find two numbers such that they add up to a specific target number.
// Let these two numbers be numbers[index1] and numbers[index2]
// where 1 <= index1 < index2 <= numbers.length.

const solution = (numbers, target) => {
  let left = 0
  // the rigth pointer starts from the end 
  let right = numbers.length - 1

  while (left < right) {
    const sum = numbers[left] + numbers[right]

    if (sum === target) {
      return [left + 1, right + 1]
    } else if (sum < target) {
      left++
    } else {
      right--
    }
  }
}

// The key insight is that, since the array is sorted,
// moving the left pointer to the right increases the sum,
// and moving the right pointer to the left decreases the sum.
