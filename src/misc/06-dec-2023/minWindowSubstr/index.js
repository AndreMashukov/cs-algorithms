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

// function solution(s, t) {
//   if (s.length === 0) {
//     return ""
//   }
//   if (t.length === 0) {
//     return ""
//   }
//   if (s === t) {
//     return s
//   }
//   const tt = t.split("")
//   // X is current max length
//   for (let x = 0; x < s.length; x++) {
//     for (let p = 0; p < s.length - x + 1; p++) {
//       // P - Cursor through all consecutive strings of length X
//       const sub = s.substring(p, p + x)
//       const filtered = sub.split("")
//         .filter(char => tt.includes(char))
//       console.log({x, p, sub, filtered})
//       if ([...new Set(filtered)].length === tt.length) {
//         return sub
//       }
//     }
//   }
// }

// Implement a solution using left and right pointers
// function solution1 (s, t) {
//   if (s.length === 0) {
//     return ''
//   }
//   if (t.length === 0) {
//     return ''
//   }
//   if (s === t) {
//     return s
//   }
//   const tt = t.split('')
//   let left = 0
//   let right = 0
//   let min = Infinity
//   let result = ''

//   while (right < s.length) {
//     const sub = s.substring(left, right + 1)
//     const filtered = sub.split('').filter(char => tt.includes(char))
//     if ([...new Set(filtered)].length === tt.length) {
//       if (sub.length < min) {
//         min = sub.length
//         result = sub
//       }
//       left++
//     } else {
//       right++
//     }
//   }

//   return result
// }
