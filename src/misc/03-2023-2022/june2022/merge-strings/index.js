// 1754. Largest Merge Of Two Strings
// // eslint-disable-next-line require-jsdoc
function countOccurencies (array, value) {
  return array.filter((val) => val === value).length
}

// eslint-disable-next-line require-jsdoc
function customSort ({ arrayToSort, arrayString1, arrayString2 }) {
  return arrayToSort.sort((a1, a2) => {
    const countForA11 = countOccurencies(arrayString1, a1)
    const countForA12 = countOccurencies(arrayString2, a1)
    const countForA21 = countOccurencies(arrayString1, a2)
    const countForA22 = countOccurencies(arrayString2, a2)
    // console.log({ a1, a2, countForA11, countForA12, countForA21, countForA22 });
    if (countForA11 + countForA12 === countForA21 + countForA22) {
      // console.log(a1 < a2);
      return a1 < a2
    }
    return countForA11 + countForA12 > countForA21 + countForA22
  })
}

/**
 * Merge strings
 *
 * @param {String} s1
 * @param {String} s2
 * @return {String}
 */
function naive (s1, s2) {
  const concatResult = s1.concat(s2)
  const concatResultArray = concatResult.split('')
  // console.log('arrayToSort', concatResultArray);
  const sorted = customSort({
    arrayToSort: concatResultArray,
    arrayString1: s1.split(''),
    arrayString2: s2.split('')
  })
  return sorted.join('')
}

// https://www.geeksforgeeks.org/lexicographically-smallest-string-possible-by-merging-two-sorted-strings/
// eslint-disable-next-line require-jsdoc
function efficient (s1, s2) {
  // Stores length of string s1
  const len1 = s1.length

  // Stores length of string s2
  const len2 = s2.length

  // Pointer to beginning
  // of string1 i.e., s1
  let pntr1 = 0

  // Pointer to beginning
  // of string2 i.e., s2
  let pntr2 = 0

  // Stores the final string
  let ans = ''
  // Traverse the strings
  while (pntr1 < len1 && pntr2 < len2) {
    // Append the smaller of the
    // two current characters
    if (s1[pntr1] < s2[pntr2]) {
      ans += s1[pntr1]
      pntr1++
    } else {
      ans += s2[pntr2]
      pntr2++
    }
  }

  // Append the remaining characters
  // of any of the two strings
  if (pntr1 < len1) {
    ans += s1.substr(pntr1, len1)
  }
  if (pntr2 < len2) {
    ans += s2.substr(pntr2, len2)
  }

  return ans
}

module.exports.mergeStrings = { naive, efficient }

// you'll compare them based on how many times they occur
// in their respective initial strings
// (fewer occurrences means the character is considered smaller).
// If the number of occurrences are equal,
// then the characters should be compared in the usual lexicographical way.
// If both number of occurences and characters are equal,
// you should take the characters from the first string to the result.
// Note that occurrences in the initial strings are compared
// - they do not change over the merge process.

// Given two strings s1 and s2, return the result
// of the special merge function you are implementing.

// Example

// For s1 = "dce" and s2 = "cccbd", the output should be
// solution(s1, s2) = "dcecccbd".
// All symbols from s1 goes first, because all of them have only 1 occurrence in s1 and c has 3 occurrences in s2.
// You'd like to make your language more unique, so for your merge function,
// instead of comparing the characters in the usual lexicographical order,
