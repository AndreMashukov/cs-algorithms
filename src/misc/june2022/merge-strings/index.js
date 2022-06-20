// eslint-disable-next-line require-jsdoc
function countOccurencies(array, value) {
  return array.filter((val) => val === value).length;
}

// eslint-disable-next-line require-jsdoc
function customSort({ arrayToSort, arrayString1, arrayString2 }) {
  return arrayToSort.sort((a1, a2) => {
    const countForA11 = countOccurencies(arrayString1, a1);
    const countForA12 = countOccurencies(arrayString2, a1);
    const countForA21 = countOccurencies(arrayString1, a2);
    const countForA22 = countOccurencies(arrayString2, a2);
    // console.log({ a1, a2, countForA11, countForA12, countForA21, countForA22 });
    if (countForA11 + countForA12 === countForA21 + countForA22) {
      // console.log(a1 < a2);
      return a1 < a2;
    }
    return countForA11 + countForA12 > countForA21 + countForA22;
  });
}

/**
 * Merge strings
 *
 * @param {String} s1
 * @param {String} s2
 * @return {String}
 */
function naive(s1, s2) {
  const concatResult = s1.concat(s2);
  const concatResultArray = concatResult.split('');
  // console.log('arrayToSort', concatResultArray);
  const sorted = customSort({
    arrayToSort: concatResultArray,
    arrayString1: s1.split(''),
    arrayString2: s2.split('')
  });
  return sorted.join('');
}

module.exports.mergeStrings = { naive };
