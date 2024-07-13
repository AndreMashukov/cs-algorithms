// You are given an array non-negative integers heights which represent an elevation map.
// Each value heights[i] represents the height of a bar, which has a width of 1.
// Return the maximum area of water that can be trapped between the bars.

// Input: height = [0,2,0,3,1,0,1,3,2,1]

// Output: 9

class Solution {
  /**
   * @param {number[]} height
   * @return {number}
   */
  trap (height) {
    if (!height || height.length === 0) {
      return 0
    }

    let l = 0
    let r = height.length - 1
    let leftMax = height[l]
    let rightMax = height[r]
    let res = 0
    while (l < r) {
      if (leftMax < rightMax) {
        l++
        leftMax = Math.max(leftMax, height[l])
        res += leftMax - height[l]
      } else {
        r--
        rightMax = Math.max(rightMax, height[r])
        res += rightMax - height[r]
      }
    }
    return res
  }
}

// rightMax keeps track of the maximum height encountered
// so far from the right side, starting with height[r].
// Pointer Movement and Water Trapping Logic:
// If leftMax is less than rightMax,
// it means the potential for trapping water is limited
// by leftMax on the left side. Therefore, the algorithm:
// Increments the left pointer l by 1 to move it rightward.
// Updates leftMax to be the maximum of its current value
// and the new height at height[l].
// Adds to res (the result) the difference between leftMax and height[l],
// which represents the water that can be trapped at this position.
// Conversely, if leftMax is greater than or equal to rightMax,
// it indicates the potential for trapping water is limited
// by rightMax on the right side. T
// he algorithm:
// Decrements the right pointer r by 1 to move it leftward.
// Updates rightMax to be the maximum of its current value and the new height at height[r].
// Adds to res the difference between rightMax and height[r].
// Termination: The loop terminates when l and r meet or cross, at which point all positions have been evaluated for water trapping potential.

// Result: The variable res accumulates the total trapped water and is returned as the output.

// This approach leverages the fact that the amount of water trapped
// at any position is determined by the minimum of the maximum heights
// to its left and right, minus the height of the bar at that position.
//  By moving the pointers inward from both ends based on the comparison
// of leftMax and rightMax, the algorithm efficiently calculates
// the maximum water that can be trapped without needing
// to explicitly maintain arrays for left and right max heights for each position.
