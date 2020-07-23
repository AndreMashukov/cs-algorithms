
/**
 * Compares values in array
 * @param {string} s - substring.
 * @param {number} index - index.
 * @return {string} - reduced string
 */
function reduceStr(s, index) {
  if (index === s.length) {
    return '';
  }

  const rightPart = reduceStr(s, index + 1);
  if (rightPart.length > 0 && s.charAt(index) === rightPart.charAt(0)) {
    return rightPart.slice(1);
  }
  // console.log('s.charAt(index)', s.charAt(index));
  // console.log('rightPart', rightPart);
  return s.charAt(index) + rightPart;
}


/**
 * Compares values in array
 * @param {string} s - first.
 * @return {string} - reduced string
 */
function superReducedString(s) {
  const result = reduceStr(s, 0);
  return result.length === 0 ? 'Empty String' : result;
}

module.exports.superReducedString = superReducedString;
