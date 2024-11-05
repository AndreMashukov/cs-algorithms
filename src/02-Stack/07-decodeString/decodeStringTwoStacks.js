// Given an encoded string, return its corresponding decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times. Note: k is guaranteed to be a positive integer.

// Note that your solution should have linear complexity because this is what you will be asked during an interview.

// Example

// For s = "4[ab]", the output should be
// solution(s) = "abababab";

function solution (s) {
  const numStack = []
  const wordStack = ['']
  let num = ''

  for (const char of s) {
    if (!isNaN(char)) {
      num = `${num}${char}`
    } else if (char === '[') {
      numStack.push(parseInt(num, 10))
      wordStack.push('')
      num = ''
    } else if (char === ']') {
      const repeater = numStack.pop()
      const word = wordStack.pop()
      wordStack[wordStack.length - 1] += word.repeat(repeater)
    } else {
      wordStack[wordStack.length - 1] += char
    }

    console.log({ num, numStack, wordStack })
  }

  return wordStack.pop()
}
