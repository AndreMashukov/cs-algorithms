// 474. Ones and Zeroes
// https://leetcode.com/problems/ones-and-zeroes/description/
// https://www.youtube.com/watch?v=miZ3qV04b1g
// You are given an array of binary strings strs
// and two integers m and n.

// Return the size of the largest subset of strs
// such that there are at most m 0's and n 1's in the subset.

// A set x is a subset of a set y if all elements of x
// are also elements of y.

// Example 1:

// Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
// Output: 4
// Explanation: The largest subset with at most 5 0's and 3 1's
// is {"10", "0001", "1", "0"}, so the answer is 4.
// Other valid but smaller subsets include
// {"0001", "1"} and {"10", "1", "0"}.
// {"111001"} is an invalid subset because it contains 4 1's,
// greater than the maximum of 3.

const findMaxFormDp = function (strs, m, n) {
  // Initialize a 2D array dp with dimensions (m+1) x (n+1) filled with 0
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))

  // Iterate over each string in strs
  for (const str of strs) {
    let zeros = 0
    let ones = 0

    // Count the number of zeros and ones in the current string
    for (const c of str) {
      if (c === '0') {
        zeros++
      } else {
        ones++
      }
    }

    // Update the dp array from bottom right to top left
    for (let i = m; i >= zeros; i--) {
      for (let j = n; j >= ones; j--) {
        // Update the dp value to the maximum of its current value or the value
        // from the previous state plus one
        dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1)
      }
    }
  }

  // Return the maximum size of the subset with at most m zeros and n ones
  return dp[m][n]
}

// strs = ["1", "0", "10"]
// m = 1 (max zeros allowed)
// n = 1 (max ones allowed)

// Initial dp[m+1][n+1]:
//        0_1s  1_1s
// 0_0s    0     0
// 1_0s    0     0

// After "1":
//        0_1s  1_1s
// 0_0s    0     1    // Can take "1" if we have capacity for 1 one
// 1_0s    0     1

// After "0":
//        0_1s  1_1s
// 0_0s    0     1
// 1_0s    1     1    // Can take "0" if we have capacity for 1 zero

// After "10":
//        0_1s  1_1s
// 0_0s    0     1
// 1_0s    1     1    // Can't take "10" as it needs 1 zero AND 1 one

// strs = ["1", "0", "10"]
// m = 1 (max zeros)
// n = 1 (max ones)

// dp[1][1] = 1 means:
// - Using at most 1 zero AND at most 1 one
// - We can form a subset of size 1
// - Valid subsets: ["1"] or ["0"]
// - Can't include "10" as it needs both zero and one

// AndreMashukov
// what dp[m][n] actually means? what question does it answer?

// GitHub Copilot
// dp[m][n] Meaning:
// dp[m][n] represents the maximum number of strings that can be formed using:

// at most m zeros
// at most n ones
// Example Breakdown:
// strs = ["1", "0", "10"]
// m = 1 (max zeros)
// n = 1 (max ones)

// dp[1][1] = 1 means:
// - Using at most 1 zero AND at most 1 one
// - We can form a subset of size 1
// - Valid subsets: ["1"] or ["0"]
// - Can't include "10" as it needs both zero and one
// Questions dp[m][n] Answers:
// "What's the largest subset size possible?"
// "How many strings can I pick while staying within m zeros and n ones?"
