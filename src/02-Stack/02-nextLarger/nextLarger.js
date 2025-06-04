// Given an array a composed of distinct elements,
// find the next larger element for each element of the array,
// i.e. the first element to the right that is greater than this element,
// in the order in which they appear in the array,
// and return the results as a new array of the same length.
// If an element does not have a larger element to its right, put -1
// in the appropriate cell of the result array.

// Example

// For a = [6, 7, 3, 8], the output should be
// solution(a) = [7, 8, 8, -1].

const solution = (a) => {
  // Stack to keep track of indices of elements
  const stack = []
  // Length of the input array
  const n = a.length
  // Result array initialized with -1
  const b = Array(n).fill(-1)

  // Forward pass through the array
  for (let i = 0; i < n; i++) {
    // While stack is not empty and the current element is greater than the element
    // at the index stored at the top of the stack
    while (stack.length && a[stack[stack.length - 1]] < a[i]) {
      // Update the result array with the current element
      b[stack.pop()] = a[i]
    }
    // Push the current index onto the stack
    stack.push(i)
  }
  // Return the result array
  return b
}

// Example usage
console.log(solution([6, 7, 3, 8])) // Output: [7, 8, 8, -1]
