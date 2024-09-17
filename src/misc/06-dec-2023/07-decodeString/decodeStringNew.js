// https://leetcode.com/problems/decode-string/description/
// Given an encoded string, return its corresponding decoded string.
// The encoding rule is: k[encoded_string], where the encoded_string
// inside the square brackets is repeated exactly k times.
// Note: k is guaranteed to be a positive integer.

// Note that your solution should have linear complexity because this is what you will be asked during an interview.

// Example

// For s = "4[ab]", the output should be
// solution(s) = "abababab";

const solution = (s) => {
  // Stack to keep track of characters and numbers
  const stack = []

  // Iterate through each character in the string
  for (let i = 0; i < s.length; i++) {
    // If the current character is not a closing bracket, push it onto the stack
    if (s[i] !== ']') {
      stack.push(s[i])
    } else {
      // If the current character is a closing bracket, start decoding
      let str = ''
      let num = ''
      let char = stack.pop()

      // Pop characters until an opening bracket is found
      while (char !== '[') {
        str = char + str
        char = stack.pop()
      }

      // Pop characters to get the number (k)
      char = stack.pop()
      while (!isNaN(char)) {
        num = char + num
        char = stack.pop()
      }

      // Push the last non-numeric character back onto the stack
      stack.push(char)

      // Repeat the decoded string k times and push it back onto the stack
      stack.push(str.repeat(+num))
    }
  }

  // Join all elements in the stack to form the final decoded string
  return stack.join('')
}

// Example usage
console.log(solution('4[ab]')) // Output: "abababab"
