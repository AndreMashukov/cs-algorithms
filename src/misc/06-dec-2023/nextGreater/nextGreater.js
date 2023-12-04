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
