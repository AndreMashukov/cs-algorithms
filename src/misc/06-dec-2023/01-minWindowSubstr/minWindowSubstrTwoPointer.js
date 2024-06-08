// Implement a solution using left and right pointers
function solution1 (s, t) {
  if (s.length === 0) {
    return ''
  }
  if (t.length === 0) {
    return ''
  }
  if (s === t) {
    return s
  }
  const tt = t.split('')
  let left = 0
  let right = 0
  let min = Infinity
  let result = ''

  while (right < s.length) {
    const sub = s.substring(left, right + 1)
    const filtered = sub.split('').filter((char) => tt.includes(char))
    if ([...new Set(filtered)].length === tt.length) {
      if (sub.length < min) {
        min = sub.length
        result = sub
      }
      left++
    } else {
      right++
    }
  }

  return result
}

console.log(solution1('ADOBECODEBANC', 'ABC'))
