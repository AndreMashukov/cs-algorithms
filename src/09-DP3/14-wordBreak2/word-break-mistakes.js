/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
    const n = s.length;
    const wordSet = new Set(wordDict);
    const dp = Array(n + 1);
    dp[n] = [""];
    for (let i = n - 1; i >= 0; i--) {
      dp[i] = [];
      for (let j = i + 1; j <= n; j++) {
        const curWord = s.substring(i, j)
        console.log(curWord, dp[j])
        if (wordSet.has(curWord) && dp[j].length > 0) {
          for (let sent of dp[j]) {
            if (sent = "") {
              dp[i].push(curWord)
            } else {
              dp[i].push(curWord + " " + sent)
            }
          }
        }
      }
    }

    return dp[0]
};