/**
 * 140 Word Break II - Dynamic Programming Solution
 * https://leetcode.com/problems/word-break-ii/description/
 * Uses bottom-up DP approach to build all possible sentences.
 * dp[i] contains all possible sentences that can be formed from s[i:].
 *
 * Time Complexity: O(2^n * n) where n is length of string
 * Space Complexity: O(2^n * n) for storing all possible combinations
 */

/**
 * Main function to find all possible word break combinations
 * @param {string} s - The input string to break
 * @param {string[]} wordDict - Array of valid dictionary words
 * @return {string[]} - Array of all possible sentences
 */
function wordBreak(s, wordDict) {
  // Convert wordDict to Set for O(1) lookup time
  const wordSet = new Set(wordDict);
  // Memoization cache: key = substring, value = array of possible sentences
  const memo = new Map();

  // Helper function to recursively find all word break combinations
  function dfs(startIndex) {
    // Base case: if we've reached the end of string, return empty array with one empty string
    if (startIndex === s.length) {
      return [''];
    }

    // Check if we've already computed result for this substring
    if (memo.has(startIndex)) {
      return memo.get(startIndex);
    }

    const result = [];

    // Try all possible word endings starting from current position
    for (let endIndex = startIndex + 1; endIndex <= s.length; endIndex++) {
      // Extract current word candidate
      const currentWord = s.substring(startIndex, endIndex);

      // If current word is in dictionary, explore remaining string
      if (wordSet.has(currentWord)) {
        // Recursively get all possible sentences for remaining string
        const remainingSentences = dfs(endIndex);

        // Combine current word with each possible remaining sentence
        for (const sentence of remainingSentences) {
          if (sentence === '') {
            // If remaining sentence is empty, just add current word
            result.push(currentWord);
          } else {
            // Otherwise, combine current word with remaining sentence
            result.push(currentWord + ' ' + sentence);
          }
        }
      }
    }

    // Store result in memoization cache
    memo.set(startIndex, result);
    return result;
  }

  return dfs(0);
}

// Test cases
console.log('=== Word Break II - Recursive Solution ===');

// Test case 1: Basic example
const s1 = 'catsanddog';
const wordDict1 = ['cat', 'cats', 'and', 'sand', 'dog'];
console.log(`\nTest 1:`);
console.log(`String: "${s1}"`);
console.log(`Dictionary: [${wordDict1.map((w) => `"${w}"`).join(', ')}]`);
console.log(
  `Result: [${wordBreak(s1, wordDict1)
    .map((s) => `"${s}"`)
    .join(', ')}]`
);
// Expected: ["cats and dog", "cat sand dog"]

// Test case 2: Multiple words
const s2 = 'pineapplepenapple';
const wordDict2 = ['apple', 'pen', 'applepen', 'pine', 'pineapple'];
console.log(`\nTest 2:`);
console.log(`String: "${s2}"`);
console.log(`Dictionary: [${wordDict2.map((w) => `"${w}"`).join(', ')}]`);
console.log(
  `Result: [${wordBreak(s2, wordDict2)
    .map((s) => `"${s}"`)
    .join(', ')}]`
);
// Expected: ["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]

// Test case 3: No valid breakdown
const s3 = 'catsandog';
const wordDict3 = ['cats', 'dog', 'sand', 'and', 'cat'];
console.log(`\nTest 3:`);
console.log(`String: "${s3}"`);
console.log(`Dictionary: [${wordDict3.map((w) => `"${w}"`).join(', ')}]`);
console.log(
  `Result: [${wordBreak(s3, wordDict3)
    .map((s) => `"${s}"`)
    .join(', ')}]`
);
// Expected: []

// Test case 4: Single word
const s4 = 'cars';
const wordDict4 = ['car', 'ca', 'rs'];
console.log(`\nTest 4:`);
console.log(`String: "${s4}"`);
console.log(`Dictionary: [${wordDict4.map((w) => `"${w}"`).join(', ')}]`);
console.log(
  `Result: [${wordBreak(s4, wordDict4)
    .map((s) => `"${s}"`)
    .join(', ')}]`
);
// Expected: ["ca rs"]

module.exports = wordBreak;
