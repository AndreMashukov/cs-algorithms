// Given an array a composed of distinct elements,
// find the next larger element for each element of the array,
// i.e. the first element to the right that is greater than this element,
// in the order in which they appear in the array,
//  and return the results as a new array of the same length.
//  If an element does not have a larger element to its right, put -1
// in the appropriate cell of the result array.

// Example

// For a = [6, 7, 3, 8], the output should be
// solution(a) = [7, 8, 8, -1].

const solution = (a) => {
  const stack = []
  const n = a.length
  const b = Array(n).fill(-1)

  // Forward pass
  for (let i = 0; i < n; i++) {
    while (stack.length && a[stack[stack.length - 1]] < a[i]) {
      b[stack.pop()] = a[i]
    }
    stack.push(i)
  }
  return b
}

console.log(solution([6, 7, 3, 8]))
