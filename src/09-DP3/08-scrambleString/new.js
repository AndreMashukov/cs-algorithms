/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
  const map = new Map();

  const dfs = (s1, s2) => {
    const key = `${s1},${s2}`;
    if (map.has(key)) {
      return map.get(key);
    }

    if (s1 === s2) {
      map.set(key, true);
      return true;
    }
    if (s1.length !== s2.length) {
      map.set(key, false);
      return false
    }

    const freq1 = {};
    const freq2 = {};
    for (let i = 0; i < s1.length; i++) {
      freq1[s1[i]] = (freq1[s1[i]] || 0) + 1
      freq2[s2[i]] = (freq2[s2[i]] || 0) + 1
    }

    for (let char in freq1) {
      if (freq1[char] !== freq2[char]) {
        map.set(key, false)
        return false
      }
    }

    for (let i = 1; i < s1.length; i++) {
      const left1 = s1.substring(0, i);
      const right1 = s1.substring(i);
      const left2 = s2.substring(0, i);
      const right2 = s2.substring(i);

      if (dfs(left1, left2) && dfs(right1, right2)) {
        map.set(key, true);
        return true;
      }

      const left2Sw = s2.substring(s2.length - i);
      const right2Sw = s2.substring(0, s2.length - i);

      if (dfs(left1, left2Sw) && dfs(right1, right2Sw)) {
        map.set(key, true);
        return true;
      }
    }

    map.set(key, false)
    return false
  }

  return dfs(s1, s2)
};