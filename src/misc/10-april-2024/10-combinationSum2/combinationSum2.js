// Given a collection of candidate numbers (candidates)
// and a target number (target),
// find all unique combinations in candidates
// where the candidate numbers sum to target.

// Each number in candidates may only be used once in the combination.

// Note: The solution set must not contain duplicate combinations.

const combinationSum2 = (candidates, target) => {
  const res = []

  candidates.sort((a, b) => a - b)

  const dfs = (i, cur, total) => {
    if (total === target) {
      res.push([...cur])
      return
    }

    if (i >= candidates.length || total > target) {
      return
    }

    for (let j = i; j < candidates.length; j++) {
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
};
