// Given a string containing digits from 2-9 inclusive,
// return all possible letter combinations
//  that the number could represent.
// Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons)
// is given below. Note that 1 does not map to any letters.

// Example 1:

// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

const letterCombinations = (digits) => {
  const res = []

  if (digits.length === 0) {
    return res
  }

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  }

  // cur - the current combination of letters
  const dfs = (i, cur) => {
    if (i === digits.length) {
      res.push(cur)
      return
    }

    // get the letters for the current digit
    // and iterate over them
    for (const c of map[digits[i]]) {
      // move to the next digit and add the current letter
      // to the current combination
      dfs(i + 1, cur + c)
      // no backtracking needed because all the combinations are stored in the res array and we are not modifying the cur variable
    }
  }

  dfs(0, '')
  return res
}

console.log(letterCombinations('23'))

// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
