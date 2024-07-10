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
