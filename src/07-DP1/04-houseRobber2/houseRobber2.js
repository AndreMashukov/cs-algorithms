// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed.
// All houses at this place are arranged in a circle.
//  That means the first house is the neighbor of the last one.
// Meanwhile, adjacent houses have a security system connected,
// and it will automatically contact the police
// if two adjacent houses were broken into on the same night.

// class Solution:
//     def rob(self, nums: List[int]) -> int:
//         return max(nums[0], self.helper(nums[1:]), self.helper(nums[:-1]))

//     def helper(self, nums):
//         rob1, rob2 = 0, 0

//         for n in nums:
//             newRob = max(rob1 + n, rob2)
//             rob1 = rob2
//             rob2 = newRob
//         return rob2

const helper = (nums) => {
  let rob1 = 0
  let rob2 = 0

  for (let i = 0; i < nums.length; i += 1) {
    const newRob = Math.max(rob1 + nums[i], rob2)
    rob1 = rob2
    rob2 = newRob
  }

  return rob2
}

const houseRobber2 = (nums) => {
  return Math.max(nums[0], helper(nums.slice(1)), helper(nums.slice(0, -1)))
}

console.log(houseRobber2([2, 3, 2])) // 3
