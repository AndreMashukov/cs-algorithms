// 16. 3Sum Closest
// https://leetcode.com/problems/3sum-closest/
// Given an integer array nums of length n and an integer target,
// find three integers in nums such that the sum is closest to target.
// Return the sum of the three integers.
// You may assume that each input would have exactly one solution.

// Example 1:

// Input: nums = [-1,2,1,-4], target = 1
// Output: 2
// Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

const threeSumClosest = function (nums, target) {
  // Sort the array to use the two-pointer technique
  nums.sort((a, b) => a - b)
  const n = nums.length
  let closestSum = Infinity // Initialize the closest sum to a large value

  // Iterate through the array
  for (let i = 0; i < n; i++) {
    // Skip duplicate elements to avoid redundant calculations
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let l = i + 1 // Left pointer
    let r = n - 1 // Right pointer

    // Use the two-pointer technique to find the closest sum
    while (l < r) {
      const curSum = nums[i] + nums[l] + nums[r] // Calculate the current sum

      // Update the closest sum if the current sum is closer to the target
      if (Math.abs(curSum - target) < Math.abs(closestSum - target)) {
        closestSum = curSum
      }

      // If the current sum is equal to the target, return the current sum
      if (curSum === target) {
        return curSum
      } else if (curSum < target) {
        l++ // Move the left pointer to the right to increase the sum
      } else {
        r-- // Move the right pointer to the left to decrease the sum
      }
    }
  }
  return closestSum // Return the closest sum found
}

// Example usage:
console.log(threeSumClosest([1, 1, 1, 0], -100)) // Expected output: 2
console.log(threeSumClosest([-1, 2, 1, -4], 1)) // Expected output: 2
console.log(threeSumClosest([0, 0, 0], 1)) // Expected output: 0
