// A message containing letters from A-Z can be encoded into numbers using the following mapping:

// 'A' -> "1"
// 'B' -> "2"
// ...
// 'Z' -> "26"
// To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

// "AAJF" with the grouping (1 1 10 6)
// "KJF" with the grouping (11 10 6)
// Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

// Given a string s containing only digits, return the number of ways to decode it.

// The test cases are generated so that the answer fits in a 32-bit integer.

const numDecodings = (s) => {
  if (s === '0') {
    return 0
  }
  if (s.length === 1) {
    return 1
  }
  const dp = {}
  dp[s.length] = 1 // Base case for recursion, beyond the last character

  const dfs = (i) => {
    if (i >= s.length) return 1 // Reached the end, count as 1 way
    if (dp[i] !== undefined) return dp[i] // Return memoized result

    if (s[i] === '0') return 0 // '0' cannot be decoded

    let res = dfs(i + 1) // Decode single digit
    if (i < s.length - 1 && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
      res += dfs(i + 2) // Decode two digits
    }

    dp[i] = res // Memoize result
    return res
  }

  return dfs(0)
}

console.log(numDecodings('11'))
console.log(numDecodings('10'))
