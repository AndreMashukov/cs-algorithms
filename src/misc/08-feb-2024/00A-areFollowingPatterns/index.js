// Given an array strings, determine whether it follows the sequence given in the patterns array.
//  In other words, there should be no i and j for which
// strings[i] = strings[j] and patterns[i] ≠ patterns[j]
// or for which strings[i] ≠ strings[j] and patterns[i] = patterns[j].

// Example

// For strings = ["cat", "dog", "dog"] and patterns = ["a", "b", "b"], the output should be
// solution(strings, patterns) = true;
// For strings = ["cat", "dog", "doggy"] and patterns = ["a", "b", "b"], the output should be
// solution(strings, patterns) = false.

function solution (strings, patterns) {
  // store each string-pattern pair in a map
  const map = new Map()

  // store each pattern in a set
  const set = new Set()

  for (let i = 0; i < strings.length; i++) {
    const string = strings[i]
    const pattern = patterns[i]

    // if the string is already in the map and the pattern is different, return false
    if (map.has(string)) {
      // f the current string-pattern pair violates the rule that
      // no two strings can be associated with different patterns
      if (map.get(string) !== pattern) {
        return false
      }
    } else {
      // it means that two different strings correspond to the same pattern
      if (set.has(pattern)) {
        return false
      }

      map.set(string, pattern)
      set.add(pattern)
    }
  }

  return true
}
