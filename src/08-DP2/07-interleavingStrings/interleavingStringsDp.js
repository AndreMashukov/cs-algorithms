// You are given three strings s1, s2, and s3.
// Return true if s3 is formed by interleaving s1 and s2 together or false otherwise.

// Input: s1 = "aaaa", s2 = "bbbb", s3 = "aabbbbaa"
// Output: true
const isInterleaveDp = (s1, s2, s3) => {
  // If the lengths of s1 and s2 combined do not match the length of s3, return false
  if (s1.length + s2.length !== s3.length) {
    return false
  }
  const dp = Array.from({ length: s1.length + 1 }, () =>
    Array(s2.length + 1).fill(false)
  )

  dp[s1.length][s2.length] = true

  for (let i = s1.length; i >= 0; i--) {
    for (let j = s2.length; j >= 0; j--) {
      if (i < s1.length && s1[i] === s3[i + j] && dp[i + 1][j]) {
        dp[i][j] = true
      }

      if (j < s2.length && s2[j] === s3[i + j] && dp[i][j + 1]) {
        dp[i][j] = true
      }
    }
  }

  return dp[0][0]
}

// Example usage
console.log(isInterleaveDp('aaaa', 'bbbb', 'aabbbbaa')) // true

// [
//   [ true,  false, false, false, false ],
//   [ true,  false, false, false, false ],
//   [ true,  true,  true,  true,  true ],
//   [ false, false, false, false, true ],
//   [ false, false, false, false, true ]
// ]

// Base cases:
// - dp[0][0] = true (empty strings interleave to empty string)
// - First row: Can we form using just s2?
// - First column: Can we form using just s1?

// For each cell dp[i][j], we check:
// 1. Can we use current char from s1? (if s1[i-1] === s3[i+j-1])
// 2. Can we use current char from s2? (if s2[j-1] === s3[i+j-1])
// Cell is true if either case works and previous state was valid

// Each cell in the table likely whether a certain substring
// of the third string can be formed by interleaving substrings
// of the first two strings.

// The rows correspond to the characters of the first string 'aaaa'.
// The columns correspond to the characters of the second string 'bbbb'.
// The value true or false indicates whether the substring up to
// that point can be formed by interleaving the substrings of the first two strings.

//        b       b      b      b      ""
//  a  [ true,  false, false, false, false ],
//  a  [ true,  false, false, false, false ], // aabb
//  a  [ true,  true,  true,  true,  true ], // aabba
//  a  [ false, false, false, false, true ], // aabbbaa
//  "" [ false, false, false, false, true ]  // ""
