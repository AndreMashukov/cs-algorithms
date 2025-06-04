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
  if (s[0] === '0') return 0
  const dp = new Array(s.length + 1).fill(0)
  // common convention in dynamic programming problems to define the solution
  // for the empty input in this way.
  // empty string can be decoded in exactly one way - by producing an empty output
  dp[0] = 1
  // number of ways to decode a string of length 1
  dp[1] = 1

  for (let i = 2; i <= s.length; i += 1) {
    // the choices at each step are whether to decode the current digit individually
    //  or pair it with the previous digit (if possible)
    if (s[i - 1] !== '0') {
      // The reason we use s[i - 1] instead of s[i] is because the dp array is 1-indexed,
      // meaning it starts from 1, while the string s is 0-indexed,
      // meaning it starts from 0.
      dp[i] += dp[i - 1]
    }

    if (s[i - 2] === '1' || (s[i - 2] === '2' && s[i - 1] <= '6')) {
      dp[i] += dp[i - 2]
    }

    // console.log(dp)
  }

  return dp[s.length]
};

// Input: s = "226"
// Output: 3
// Explanation: "226" could be decoded as
// "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

console.log(numDecodings('226'))

// [ 1, 1, 2, 0 ]
// [ 1, 1, 2, 3 ]

// For the first digit '2', there's only one choice, which is to decode it individually as 'B'.
// So, there's 1 way to decode the string "2".

// For the second digit '2', there are two choices:

// Decode it individually as 'B'. This gives the decoding "BB"
// for the string "22".

// Pair it with the previous digit to form the two-digit number '22',
// which can be decoded as 'V'. This gives the decoding "V" for the string "22".

// So, there are 2 ways to decode the string "22".

// For the third digit '6', there are two choices:

// Decode it individually as 'F'. This can be added to each of the previous decodings,
// giving "BBF" and "VF".

// Pair it with the previous digit to form the two-digit number '26',
// which can be decoded as 'Z'. This can only be added to the decoding "B" of the string "2"
//  s (the substring of "226" excluding the last two digits), giving "BZ".

// So, there are 3 ways to decode the string "226".
