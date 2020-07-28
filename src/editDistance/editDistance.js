/**
 * Calculate levenshtein distance of the two strings.
 * @param {string} a - first string.
 * @param {string} b - second string.
 * @return {number} - distance (0 and above)
 */
const editDistance = function(a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  // swap to save some memory O(min(a,b)) instead of O(a)
  if (a.length > b.length) {
    const tmp = a;
    a = b;
    b = tmp;
  }

  const row = [];
  // init the row
  for (let i = 0; i <= a.length; i++) {
    row[i] = i;
  }

  // fill in the rest
  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      let val;
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        val = row[j - 1]; // match
      } else {
        val = Math.min(
            row[j - 1] + 1, // substitution
            prev + 1, // insertion
            row[j] + 1,
        ); // deletion
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }

  return row[a.length];
};

exports.default = editDistance;
