// Given a string s and a dictionary of strings wordDict,
// return true if s can be segmented
// into a space-separated sequence of dictionary words.

// You are allowed to reuse words in the dictionary an unlimited number of times.
// You may assume all dictionary words are unique.

// Example:
// Input: s = "applepenapple", wordDict = ["apple","pen","ape"]
// Output: true
// The function doesn't require that all words in wordDict be used,
// but it does require that all characters in s be used.

class Solution {
  /**
   * @param {string} s
   * @param {string[]} wordDict
   * @return {boolean}
   */
  wordBreak (s, wordDict) {
    // includes an extra space for the base case, which is an empty string.
    const dp = new Array(s.length + 1).fill(false)

    // base case of the dynamic programming solution, which is an empty string.
    // In the context of this problem, an empty string can always be segmented
    // into a sequence of words from the dictionary (since no words are needed),
    // so it's considered a valid segmentation
    dp[s.length] = true

    // bottom up approach
    for (let i = s.length - 1; i >= 0; i--) {
      for (const w of wordDict) {
        // If this substring is equal to w, it means that w
        // is a segment of s starting at position i
        // i + w.length <= s.length: This checks if the length of the word w
        // doesn't exceed the remaining length of the string s starting from index i.
        if (i + w.length <= s.length && s.slice(i, i + w.length) === w) {
          dp[i] = dp[i + w.length]
        }
        // If dp[i] is true, it means that there exists a word in the dictionary
        // that ends at index i, and the rest of the substring before
        // this word can also be segmented into words from the dictionary.
        if (dp[i]) {
          // To ensure we don't overwrite a successful segmentation with a failed one
          break
        }
      }
    }

    // The element dp[0] represents whether the entire string s can be segmented
    return dp[0]
  }
}

console.log(
  new Solution().wordBreak('applepenapple', ['apple', 'pen', 'ape']) // true
)

// Here's what dp[i] = dp[i + w.length] does:
// dp[i + w.length]: This checks the value at the index i + w.length
// in the dp array.
// If this value is true, it means that the string s can be segmented
// into a sequence of words from wordDict starting
// from the index i + w.length.

// dp[i] = dp[i + w.length]: This assigns the value of dp[i + w.length] to dp[i].
// If dp[i + w.length] is true,
// it means that the string s can be segmented into a sequence of words
// from wordDict starting from the index i.
// This is because if s can be segmented starting from i + w.length,
// and the word w is a segment of s starting at i,
// then s can also be segmented starting from i.
