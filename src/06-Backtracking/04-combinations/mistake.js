/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const res = [];

  const dfs = (i, cur) => {
    if (cur.length === k) {
      res.push([...cur])
      return
    }

    if (i > n) {
      return
    }

    for (let j = i; j < n; j++) {
      cur.push(j);
      dfs(j + 1, cur);
      cur.pop()
    }
  }

  dfs(1, []);
  return res
};