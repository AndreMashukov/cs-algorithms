// Given an array of integers a, return a new array b
// using the following guidelines:

// For each index i in b, the value of bi is the index of
// the aj nearest
//  to ai and is also greater than ai.

// If there are two options for bi, put the leftmost one in bi.
// If there are no options for bi, put -1 in bi.

function solution (a) {
  let stack = []
  const n = a.length
  const b = Array(n).fill(-1)

  // Forward pass
  for (let i = 0; i < n; i++) {
    while (stack.length && a[stack[stack.length - 1]] < a[i]) {
      b[stack.pop()] = i
    }
    stack.push(i)
  }

  console.log({ b })
  // Backward pass
  stack = []
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && a[stack[stack.length - 1]] < a[i]) {
      const j = stack.pop()
      if (b[j] === -1 || b[j] - i > j - i) {
        // console.log({ a, ai: a[i], bj: b[j], bji: b[j] - i, j, i })
        b[j] = i
      }
    }
    stack.push(i)
  }

  return b
}

module.exports = {
  solution
}

// a[stack[stack.length - 1]] < a[i]:
// This checks if the value in array a at the index
// at the top of the stack is less than the current element a[i].
// If it is, it means we have found the next greater element
//  for the value at the top of the stack, which is a[i].
