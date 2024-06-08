// You have two strings, s and t. The string t contains only unique elements.
//  Find and return the minimum consecutive substring of s
// that contains all of the elements from t.

// It's guaranteed that the answer exists. If there are several answers,
// return the one which starts from the smallest index.

// https://www.youtube.com/watch?v=eS6PZLjoaq8

function solution (s, t) {
  // to store last occurence index of each character in t
  const map = new Map()
  const set = new Set(t)
  let min = Infinity
  let result = ''

  for (let i = 0; i < s.length; i++) {
    const char = s[i]

    // it's one of the characters we're looking for.
    if (set.has(char)) {
      // updates map with the current index i.
      // char versus its index!
      map.set(char, i)

      // we have found a substring that contains all the characters in t
      if (map.size === set.size) {
        // minIndex not min
        const minIndex = Math.min(...map.values())
        const maxIndex = Math.max(...map.values())
        // maxIndex - minIndex + 1
        const length = maxIndex - minIndex + 1

        // if the current substring being evaluated has a smaller length
        // than the current minimum length
        if (length < min) {
          min = length
          // maxIndex + 1
          result = s.slice(minIndex, maxIndex + 1)
        }
      }
    }
  }

  return result
}
