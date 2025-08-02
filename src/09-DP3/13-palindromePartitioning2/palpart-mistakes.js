/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
  const map = new Map();
  const n = s.length;
  const isPali = new Array(n).fill().map(() => Array(n).fill(false));
  // console.log(isPali)

  for (let i = 0; i < n; i++) {
    isPali[i][i] = true
  }

  for (let i = 1; i < n; i++) {
    if (s[i] === s[i - 1]) {
      isPali[i - 1][i] = true
    } 
  }

  for (let len = 3; len <= n; len++) {
    for (let i = 0; i < n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && isPali[i + 1][j - 1]) {
        isPali[i][i + len] = true
      }
    }
  }

  const dfs = (start) => {
    if (start >= n) {
      return 0;
    }

    if (map.has(start)) {
      return map.get(start);
    }

    let minCuts = Infinity;
    for (let end = start; end < n; end++) {
      if (isPali[start][end]) {
        const remainingCuts = dfs(end + 1);
        const totalCuts = (end === n - 1) ? remainingCuts : 1 + remainingCuts;
        minCuts = Math.min(minCuts, totalCuts)
      }
    }

    map.set(start, minCuts)
    return minCuts;
  }

  return dfs(0)
};