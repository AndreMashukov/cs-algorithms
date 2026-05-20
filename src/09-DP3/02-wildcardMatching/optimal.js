/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  let sIdx = 0, pIdx = 0;
  let startIdx = -1, matchIdx = -1;

  while (sIdx < s.length) {
    if (pIdx < p.length && (p[pIdx] === "?" || s[sIdx] === p[pIdx])) {
      sIdx++
      pIdx++
    } else if (pIdx < p.length && p[pIdx] === "*") {
      startIdx = pIdx
      matchIdx = sIdx;
      pIdx++
    } else if (startIdx !== -1) {
      pIdx = startIdx + 1;
      matchIdx++
      sIdx = matchIdx
    } else {
      return false
    }
  }

  while (pIdx < p.length && p[pIdx] === "*") {
    pIdx++
  }

  return pIdx === p.length
};