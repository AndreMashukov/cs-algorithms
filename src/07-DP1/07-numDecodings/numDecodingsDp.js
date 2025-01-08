class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  numDecodings (s) {
    // If the string is '0', it cannot be decoded
    if (s === '0') {
      return 0
    }
    // If the string has only one character, it can be decoded in one way
    if (s.length === 1) {
      return 1
    }

    const n = s.length

    // Create a dp array to store the number of ways to decode the string up to each index
    const dp = new Array(n + 1).fill(0)

    // Base case: there is one way to decode an empty string
    dp[n] = 1

    // Iterate over the string from the end to the beginning
    for (let i = n - 1; i >= 0; i--) {
      // If the current character is '0', it cannot be decoded
      if (s[i] === '0') {
        dp[i] = 0
      } else {
        // Decode the current character as a single digit
        dp[i] = dp[i + 1]
        // Check if the current and next characters can be decoded as a two-digit number
        if (i + 1 < n && (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))) {
          dp[i] += dp[i + 2]
        }
      }
    }
    // Log the dp array for debugging purposes
    console.log(dp)
    // Return the number of ways to decode the entire string
    return dp[0]
  }
}

console.log(new Solution().numDecodings('11')) // Output: 2
