/**
 * Longest substring with at most K unique characters
 * @param {string} input - string.
 * @param {number} k - number of unique chars.
 * @return {object} - Longest substring with at most K unique characters
 */
function find(input, k) {
  // first check if at least k unique chars are present in string
  const set = new Set();

  for (let i = 0; i < input.length; i++) {
    const c = input.charAt(i);
    set.add(c);
  }

  if (set.size < k) {
    return {
      substr: 'N/A',
      length: 0,
    };
  }

  let maxStart = 0;
  let maxLength = 0;
  let currStart = 0;
  let currEnd = 0;
  const alphaCounts = new Array(26).fill(0);
  // Arrays.fill(alphaCounts, 0);

  for (let i = 0; i < input.length; i++) {
    const index = input.charCodeAt(i) - 97;
    alphaCounts[index]++;
    currEnd++;
    // console.log(alphaCounts);

    // check if new char is added or unique chars count
    // is at most k in the window
    while (!isValid(alphaCounts, k)) {
      // alphaCounts[input.charAt(curr_Start)-'a']--;
      alphaCounts[input.charCodeAt(currStart) - 97]--;
      currStart++;
    }

    // check if max_length needs to be updated
    if (currEnd - currStart > maxLength) {
      maxStart = currStart;
      maxLength = currEnd - currStart;
    }
  }
  // System.out.println("Longest substring with "+k+"
  //  most unique characters is : "
  //         + input.substring(max_Start, max_Start+max_Length)
  //         + " with length " + max_Length);
  return {
    substr: input.substring(maxStart, maxStart + maxLength),
    length: maxLength,
  };
}
/**
 * isValid
 * @param {array} alphaCounts - array.
 * @param {number} k - number.
 * @return {boolean} - isValid
 */
function isValid(alphaCounts, k) {
  let uniqueChars = 0;
  for (let i = 0; i < alphaCounts.length; i++) {
    if (alphaCounts[i] > 0) {
      uniqueChars++;
    }
  }

  if (uniqueChars > k) {
    return false;
  }

  return true;
}

module.exports.find = find;
