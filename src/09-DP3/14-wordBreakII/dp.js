/**
 * Word Break II - Dynamic Programming Solution
 * 
 * Uses bottom-up DP approach to build all possible sentences.
 * dp[i] contains all possible sentences that can be formed from s[i:].
 * 
 * Time Complexity: O(2^n * n) where n is length of string
 * Space Complexity: O(2^n * n) for storing all possible combinations
 */

/**
 * Main function to find all possible word break combinations using DP
 * @param {string} s - The input string to break
 * @param {string[]} wordDict - Array of valid dictionary words
 * @return {string[]} - Array of all possible sentences
 */
function wordBreak(s, wordDict) {
    const n = s.length;
    const wordSet = new Set(wordDict);
    
    // dp[i] = array of all possible sentences that can be formed from s[i:]
    const dp = new Array(n + 1);
    
    // Base case: empty string can form one empty sentence
    dp[n] = [''];
    
    // Fill DP table from right to left (bottom-up)
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = [];
        
        // Try all possible word endings starting from position i
        for (let j = i + 1; j <= n; j++) {
            // Extract current word candidate from position i to j
            const currentWord = s.substring(i, j);
            
            // If current word is in dictionary and remaining string has valid sentences
            if (wordSet.has(currentWord) && dp[j].length > 0) {
                // Combine current word with each sentence from remaining string
                for (const sentence of dp[j]) {
                    if (sentence === '') {
                        // If remaining sentence is empty, just add current word
                        dp[i].push(currentWord);
                    } else {
                        // Otherwise, combine current word with remaining sentence
                        dp[i].push(currentWord + ' ' + sentence);
                    }
                }
            }
        }
    }
    
    // Return all possible sentences starting from beginning of string
    return dp[0];
}

/**
 * Alternative DP approach using two passes:
 * 1. First pass: check if word break is possible
 * 2. Second pass: build all possible sentences if word break is possible
 */
function wordBreakTwoPass(s, wordDict) {
    const n = s.length;
    const wordSet = new Set(wordDict);
    
    // First pass: check if word break is possible using simple DP
    const canBreak = new Array(n + 1).fill(false);
    canBreak[0] = true;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            const word = s.substring(j, i);
            if (canBreak[j] && wordSet.has(word)) {
                canBreak[i] = true;
                break;
            }
        }
    }
    
    // If word break is not possible, return empty array
    if (!canBreak[n]) {
        return [];
    }
    
    // Second pass: build all possible sentences
    const dp = new Array(n + 1);
    dp[n] = [''];
    
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = [];
        
        for (let j = i + 1; j <= n; j++) {
            const currentWord = s.substring(i, j);
            
            if (wordSet.has(currentWord) && dp[j].length > 0) {
                for (const sentence of dp[j]) {
                    if (sentence === '') {
                        dp[i].push(currentWord);
                    } else {
                        dp[i].push(currentWord + ' ' + sentence);
                    }
                }
            }
        }
    }
    
    return dp[0];
}

// Test cases
console.log("=== Word Break II - Dynamic Programming Solution ===");

// Test case 1: Basic example
const s1 = "catsanddog";
const wordDict1 = ["cat", "cats", "and", "sand", "dog"];
console.log(`\nTest 1:`);
console.log(`String: "${s1}"`);
console.log(`Dictionary: [${wordDict1.map(w => `"${w}"`).join(', ')}]`);
console.log(`DP Result: [${wordBreak(s1, wordDict1).map(s => `"${s}"`).join(', ')}]`);
console.log(`Two-Pass Result: [${wordBreakTwoPass(s1, wordDict1).map(s => `"${s}"`).join(', ')}]`);

// Test case 2: Multiple combinations
const s2 = "pineapplepenapple";
const wordDict2 = ["apple", "pen", "applepen", "pine", "pineapple"];
console.log(`\nTest 2:`);
console.log(`String: "${s2}"`);
console.log(`Dictionary: [${wordDict2.map(w => `"${w}"`).join(', ')}]`);
console.log(`DP Result: [${wordBreak(s2, wordDict2).map(s => `"${s}"`).join(', ')}]`);

// Test case 3: No valid breakdown
const s3 = "catsandog";
const wordDict3 = ["cats", "dog", "sand", "and", "cat"];
console.log(`\nTest 3:`);
console.log(`String: "${s3}"`);
console.log(`Dictionary: [${wordDict3.map(w => `"${w}"`).join(', ')}]`);
console.log(`DP Result: [${wordBreak(s3, wordDict3).map(s => `"${s}"`).join(', ')}]`);

// Test case 4: Edge case
const s4 = "aaaaaaa";
const wordDict4 = ["aaaa", "aa"];
console.log(`\nTest 4:`);
console.log(`String: "${s4}"`);
console.log(`Dictionary: [${wordDict4.map(w => `"${w}"`).join(', ')}]`);
console.log(`DP Result: [${wordBreak(s4, wordDict4).map(s => `"${s}"`).join(', ')}]`);

module.exports = { wordBreak, wordBreakTwoPass };