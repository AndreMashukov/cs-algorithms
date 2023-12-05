// Given an array strings, determine whether it follows the sequence given in the patterns array. In other words, there should be no i and j for which strings[i] = strings[j] and patterns[i] ≠ patterns[j] or for which strings[i] ≠ strings[j] and patterns[i] = patterns[j].

// Example

// For strings = ["cat", "dog", "dog"] and patterns = ["a", "b", "b"], the output should be
// solution(strings, patterns) = true;
// For strings = ["cat", "dog", "doggy"] and patterns = ["a", "b", "b"], the output should be
// solution(strings, patterns) = false.

function solution (strings, patterns) {
  const map = new Map()
  const set = new Set()

  for (let i = 0; i < strings.length; i++) {
    const string = strings[i]
    const pattern = patterns[i]

    if (map.has(string)) {
      if (map.get(string) !== pattern) {
        return false
      }
    } else {
      if (set.has(pattern)) {
        return false
      }

      map.set(string, pattern)
      set.add(pattern)
    }
  }

  return true
}