/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
  const memo = new Map();

  const helper = (s1, s2) => {
    const key = s1 + "#" + s2;

    if (memo.has(key)) {
      return memo.get(key);
    }

    if (s1 === s2) {
      return true
    }

    if (s1.length !== s2.length) {
      return false 
    }

    const count = Array(26).fill(0)
    for (let i = 0; i < s1.length; i++) {
      count[s1.charCodeAt(i) - 97]++
      count[s2.charCodeAt(i) - 97]--
    }

    for (let i = 0; i < 26; i++) {
      if (count[i] !== 0) {
        memo.set(key, false)
        return false
      }
    }
    const n = s1.length;
    for (let i = 1; i < n; i++) {
      if (helper(s1.slice(0, i), s2.slice(0, i)) && helper(s1.slice(i), s2.slice(i))) {
        memo.set(key, true)
        return true;
      }

      if (helper(s1.slice(0, i), s2.slice(n - i)) && helper(s1.slice(i), s2.slice(0, n - i))) {
        memo.set(key, true)
        return true
      }
    }

    memo.set(key, false)
    return false
  }
  return helper(s1, s2)
};