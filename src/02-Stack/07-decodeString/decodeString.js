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
  const stack = []
  // num is a string also
  let num = ''
  let str = ''

  for (let i = 0; i < s.length; i++) {
    const char = s[i]

    // If the character is an opening bracket [,
    // it pushes the current num (converted to a number
    // with the unary plus operator +) and str
    // onto the stack and resets num and str.
    if (char === '[') {
      stack.push([+num, str])
      num = ''
      str = ''
      // If the character is a closing bracket ],
      // it pops the top element from the stack (which is an array [n, s]),
      // repeats the current str n times,
      // and prepends s to it.
    } else if (char === ']') {
      const [n, s] = stack.pop()
      str = s + str.repeat(n)
    } else if (isNaN(char)) {
      str += char
    } else {
      num += char
    }
    // console.log(stack, num, str)
  }

  return str
}

console.log(solution('4[ab]'))
console.log(solution('2[b3[a]]'))

// s + str.repeat(n):
// This concatenates the string s and the repeated string str.
// The string s is the string that was pushed onto
// the stack before the last opening bracket [ was encountered.
// This means that s contains the decoded string up to that point.
