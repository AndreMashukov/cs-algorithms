// Given two strings, s and t, find the length of their longest common substring.

// Example

// For s = "abcdxyz" and t = "xyzabcd", the output should be
// solution(s, t) = 4;

// For s = "zxabcdezy" and t = "yzabcdezx", the output should be
// solution(s, t) = 6.

// The longest common substring is "abcdez" and has a length of 6.

function solution (s, t) {
  const dp = Array(s.length + 1).fill(0).map(() => Array(t.length + 1).fill(0))
  let max = 0

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        max = Math.max(max, dp[i][j])
      }
    }
  }

  return max
}
// xyzabcd

//    x y z a b c d
//  0,0,0,0,0,0,0,0
// a0,0,0,0,1,0,0,0
// b0,0,0,0,0,2,0,0
// c0,0,0,0,0,0,3,0
// d0,0,0,0,0,0,0,4
// x0,1,0,0,0,0,0,0
// y0,0,2,0,0,0,0,0
// z0,0,0,3,0,0,0,0
