// Design an algorithm to encode a list of strings to a single string.
// The encoded string is then decoded back
// to the original list of strings.

// Please implement encode and decode

class Solution {
  /**
   * Encodes a list of strings to a single string.
   * @param {string[]} strs - List of strings to encode
   * @returns {string} - Encoded string
   */
  encode (strs) {
    let result = ''
    for (const s of strs) {
      // Append the length of the string, a delimiter '#', and the string itself
      result += `${s.length}#${s}`
    }
    return result
  }

  /**
   * Decodes a single string to a list of strings.
   * @param {string} str - Encoded string
   * @returns {string[]} - Decoded list of strings
   */
  decode (str) {
    const result = []
    let i = 0

    while (i < str.length) {
      let j = i
      // Find the position of the delimiter '#'
      while (str[j] !== '#') {
        j++
      }
      // Extract the length of the next string
      const length = parseInt(str.substring(i, j), 10)
      i = j + 1 // Move past the delimiter
      j = i + length // Calculate the end position of the string
      // Extract the string and add it to the result list
      result.push(str.substring(i, j))
      i = j // Move to the next part of the encoded string
    }
    return result
  }
}

// Example usage
const encoded = new Solution().encode(['hello', 'world'])
console.log(encoded) // '5#hello5#world'
console.log(new Solution().decode(encoded)) // ['hello', 'world']
