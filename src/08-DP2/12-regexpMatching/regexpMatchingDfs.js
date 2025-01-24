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
  // Memoization map to store results of subproblems
  const memo = new Map()

  // Depth-First Search function to check if s[i:] matches p[j:]
  const dfs = (i, j) => {
    // Check if the result is already computed
    if (memo.has(`${i},${j}`)) {
      return memo.get(`${i},${j}`)
    }

    // If we have reached the end of the pattern
    if (j === p.length) {
      // Check if we have also reached the end of the string
      return i === s.length
    }

    // Check if the current characters match
    const firstMatch = i < s.length && (s[i] === p[j] || p[j] === '.')

    let ans
    // If the next character in the pattern is '*'
    if (j + 1 < p.length && p[j + 1] === '*') {
      // Two possibilities:
      // 1. Skip the '*' and the preceding element, move to the next character in the pattern
      // 2. Use the '*' to match the current character in the string, move to the next character in the string
      ans = dfs(i, j + 2) || (firstMatch && dfs(i + 1, j))
    } else {
      // If the next character is not '*', move to the next characters in both the string and the pattern
      ans = firstMatch && dfs(i + 1, j + 1)
    }

    // Store the result in the memoization map
    memo.set(`${i},${j}`, ans)
    return ans
  }

  // Start the DFS from the beginning of both the string and the pattern
  return dfs(0, 0)
}

// Test cases
console.log(isMatchDfs('aa', '.b')) // false
console.log(isMatchDfs('aa', '.*')) // true
console.log(isMatchDfs('aab', 'c*a*b')) // true
