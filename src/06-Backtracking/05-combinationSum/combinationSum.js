// Given an array of distinct integers candidates and a target integer target,
// return a list of all unique combinations of candidates
// where the chosen numbers sum to target.
// You may return the combinations in any order.

// Example
// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]

// class Solution:
//     def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
//         res = []

//         def dfs(i, cur, total):
//             if total == target:
//                 res.append(cur.copy())
//                 return
//             if i >= len(candidates) or total > target:
//                 return

//             cur.append(candidates[i])
//             dfs(i, cur, total + candidates[i])
//             cur.pop()
//             dfs(i + 1, cur, total)

//         dfs(0, [], 0)
//         return res

const combinationSum = (nums, target) => {
  const res = []

  // cur - the current combination of numbers
  // i - the current index in the candidates list
  // total - the current sum of the combination
  const dfs = (i, cur, total) => {
    if (total === target) {
      res.push([...cur])
      return
    }

    // if the current index is greater than the length of the candidates list
    if (i >= nums.length || total > target) {
      return
    }

    // include the current number
    // why use same index i in the recursive call?
    // because we can use the same number multiple times
    cur.push(nums[i])
    // i instead of i + 1 because this problem allows for the same number to be used multiple times in the combination
    dfs(i, cur, total + nums[i])
    // exclude the current number and move to the next number
    cur.pop()
    dfs(i + 1, cur, total)
  }

  dfs(0, [], 0)
  return res
}

console.log(
  combinationSum([2, 3, 6, 7], 7)
)

// [[2,2,3],[7]]
