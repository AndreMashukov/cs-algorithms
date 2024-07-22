// You are given an array of integers heights where heights[i]
// represents the height of a bar. The width of each bar is 1.

// Return the area of the largest rectangle that can be formed among the bars.

// Note: This chart is known as a histogram.
// Example 1:
// Input: heights = [7,1,7,2,2,4]
// Output: 8

class Solution {
  /**
   * @param {number[]} heights
   * @return {number}
   */
  largestRectangleArea (heights) {
    let maxArea = 0
    const stack = [] // pair: (index, height)

    for (let i = 0; i < heights.length; i++) {
      let start = i
      // Pop elements from the stack while the current element is less than the last element in the stack
      while (stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
        const [index, height] = stack.pop()
        maxArea = Math.max(maxArea, height * (i - index))
        // The start of the rectangle is the index of the last element popped from the stack
        start = index
      }
      // Push the current element to the stack
      stack.push([start, heights[i]])
    }

    for (const [index, height] of stack) {
      maxArea = Math.max(maxArea, height * (heights.length - index))
    }
    return maxArea
  }
}
