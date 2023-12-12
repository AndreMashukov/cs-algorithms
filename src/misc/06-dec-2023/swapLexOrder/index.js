// Given a string str and array of pairs that indicates which indices in the string can be swapped, return the lexicographically largest string that results from doing the allowed swaps. You can swap indices any number of times.

// Example

// For str = "abdc" and pairs = [[1, 4], [3, 4]], the output should be
// solution(str, pairs) = "dbca".

function customSort (s, t) {
  let i = 0
  while (i < s.length && i < t.length) {
    if (s[i] < t[i]) {
      return -1 // s < t
    } else if (s[i] > t[i]) {
      return 1 // s > t
    }
    i++
  }

  // If one string is a prefix of the other, the shorter string is considered smaller
  if (s.length < t.length) {
    return -1
  } else if (s.length > t.length) {
    return 1
  }

  return 0 // s = t
}

function solution (str, pairs) {
  const pairsHash = pairs.reduce((acc, val) => {
    const hash = val.join(',')
    if (!acc[hash]) {
      acc[hash] = {
        checked: false,
        value: val
      }
    }
    return acc
  }, {})

  const swap = (str, k, l) => {
    const i = k - 1
    const j = l - 1
    const arr = str.split('')
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    // console.log(str, arr.join(''), i, j)
    return arr.join('')
  }

  const recurse = (str, pairs, index, max) => {
    if (index === pairs.length) {
      //   max = str > max ? str : max
      max = customSort(str, max) === 1 ? str : max
      return max
    }

    const [i, j] = pairs[index]
    const swapped = swap(str, i, j)
    console.log(pairs[index])
    max = recurse(swapped, pairs, index + 1, max)
    max = recurse(str, pairs, index + 1, max)
    return max
  }

  return recurse(str, pairs, 0, str)
}
