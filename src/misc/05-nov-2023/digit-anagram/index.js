function digitAnagram (A) {
  const d = {}
  for (const a of A) {
    const asorted = a.toString().split('').sort().join('')
    if (d[asorted]) {
      d[asorted].push(a)
    } else {
      d[asorted] = [a]
    }
  }

  function combos (v) {
    const n = v.length
    if (n < 2) return 0
    return factorial(n) / (2 * factorial(n - 2))
  }

  return Object.values(d).reduce((acc, v) => acc + combos(v), 0)
}

function factorial (n) {
  if (n === 0 || n === 1) return 1
  return n * factorial(n - 1)
}

function solution (a) {
  return digitAnagram(a)
}

module.exports = {
  solution
}

// from collections import defaultdict
// import math

// def digitAnagram(A):
//     d = defaultdict(list)
//     for a in A:
//         asorted = "".join(sorted(str(a)))
//         d[asorted].append(a)

//     def combos(v):
//         n = len(v)
//         if n < 2: return 0
//         return math.factorial(n) // (2 * math.factorial(n-2))

//     return sum(map(combos, d.values()))

// def solution(a):
//     return digitAnagram(a)
