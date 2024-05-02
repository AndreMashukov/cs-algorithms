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

  // i - the current index in the string
  // cur - the current partition that we are building
  const dfs = (i, cur) => {
    // if we have reached the end of the string
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

// The DFS starts at the root of the tree (the empty string)
// and first explores the leftmost branch, which starts with "a".

// It then continues down this branch, adding the next character "a"
// to the current partition to form "aa". "aa" is a palindrome,
// so it continues to the next character "b", forming "aab".
// However, "aab" is not a palindrome.

// The algorithm then backtracks, removing "b" from the current partition
// to return to "aa".

// It then explores the next branch, which starts with "aa, b".
// "aa, b" is a valid partition because both
// "aa" and "b" are palindromes.

// The algorithm then backtracks to the beginning
// and explores the next branch starting with "a".
// It adds the next character "a" to the current
//  partition to form "a, a".

// It then continues down this branch,
// adding the next character "b" to the current partition
// to form "a, a, b".
// "a, a, b" is a valid partition because "a", "a", and "b" are all palindromes.
