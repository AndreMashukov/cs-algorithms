// Given a string s, partition s such that every
// substring
//  of the partition is a
// palindrome
// . Return all possible palindrome partitioning of s.

// Example 1:

// Input: s = "aab"
// Output: [["a","a","b"],["aa","b"]]

const palindromePartitioning = (s) => {
  const res = []

  const isPalindrome = (str) => {
    let left = 0
    let right = str.length - 1

    while (left < right) {
      if (str[left] !== str[right]) {
        return false
      }
      left++
      right--
    }

    return true
  }

  const dfs = (i, cur) => {
    if (i === s.length) {
      res.push([...cur])
      return
    }

    // start from the current index i and go to the end of the string
    for (let j = i; j < s.length; j++) {
      const str = s.slice(i, j + 1)
      // slice() takes the start index and the end index

      if (isPalindrome(str)) {
        // push the current string to the current array
        cur.push(str)
        // j + 1 because we want to start from the next index
        dfs(j + 1, cur)
        // pop the last element to backtrack
        cur.pop()
      }
    }
  }

  dfs(0, [])
  return res
}

console.log(palindromePartitioning('aab'))

// Output: [["a","a","b"],["aa","b"]]
