/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  const map = new Map()

  const dfs = (i, j) => {
    if (i === m) {
      return n - j
    }

    if (j === n) {
      return m - i
    }

    const key = `${i},${j}`;

    if (map.has(key)) {
      return map.get(key);
    }

    let res
    if (word1[i] === word2[j]) {
      res = dfs(i + 1, j + 1);
      map.set(key, res)
      return res
    } else {
      res = Math.min(dfs(i + 1, j), dfs(i, j + 1));
      res = Math.min(res, dfs(i + 1, j + 1));
      map.set(key, 1 + res);
      return res
    }
  }

  return dfs(0, 0)
};