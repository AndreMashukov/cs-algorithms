// You are given an input string s consisting of lowercase english letters,
// and a pattern p consisting of lowercase english letters,
// as well as '.', and '*' characters.

// Return true if the pattern matches the entire input string,
// otherwise return false.

// '.' Matches any single character
// '*' Matches zero or more of the preceding element.
// Example 1:

// Input: s = "aa", p = ".b"

// Output: false

const isMatchDfs = (s, p) => {
  const memo = new Map()
  const dfs = (i, j) => {
    if (memo.has(`${i},${j}`)) {
      return memo.get(`${i},${j}`)
    }
    if (j === p.length) {
      return i === s.length
    }
    const firstMatch = i < s.length && (s[i] === p[j] || p[j] === '.')
    let ans
    if (j + 1 < p.length && p[j + 1] === '*') {
      ans = dfs(i, j + 2) || (firstMatch && dfs(i + 1, j))
    } else {
      ans = firstMatch && dfs(i + 1, j + 1)
    }
    memo.set(`${i},${j}`, ans)
    return ans
  }
  return dfs(0, 0)
}

console.log(isMatchDfs('aa', '.b')) // false
console.log(isMatchDfs('aa', '.*')) // true
console.log(isMatchDfs('aab', 'c*a*b')) // true
