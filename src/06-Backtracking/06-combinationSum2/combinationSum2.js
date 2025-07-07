// Given a collection of candidate numbers (candidates)
// and a target number (target),
// find all unique combinations in candidates
// where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

const combinationSum2 = (candidates, target) => {
  const res = []

  // sort the candidates array to avoid duplicates
  candidates.sort((a, b) => a - b)

  const dfs = (i, cur, total) => {
    if (total === target) {
      res.push([...cur])
      return
    }

    if (i >= candidates.length || total > target) {
      return
    }

    // start from the current index i and go to the end of the array
    for (let j = i; j < candidates.length; j++) {
      // if the current element is the same as the previous element,
      // we can skip it
      // why j > i? because we want to skip the first elementin the array
      // if the first element is the same as the second element
      if (j > i && candidates[j] === candidates[j - 1]) {
        continue
      }

      cur.push(candidates[j])
      dfs(j + 1, cur, total + candidates[j])
      cur.pop()
    }
  }

  dfs(0, [], 0)
  return res
}

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))

// Output: [[1,1,6],[1,2,5],[1,7],[2,6]]

// if (j > i && candidates[j] === candidates[j - 1]) {
// this condition does not prevent an element
// from being included multiple times in a combination
// if those instances of the element are not adjacent in the candidates array.
// That's why the combination [1, 1, 6] is possible:
// the two 1s are adjacent in the candidates array,
// but they are included in the combination at different times,
// so they are not considered duplicates by this condition.

// The condition if (j > i && candidates[j] === candidates[j - 1])
// is used to avoid duplicate combinations,
//  not duplicate elements within a combination.
