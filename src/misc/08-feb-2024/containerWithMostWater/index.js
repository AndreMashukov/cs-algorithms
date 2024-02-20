// You are given an integer array height of length n.
// There are n vertical lines drawn such that
// the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container,
// such that the container contains the most water.

// Return the maximum amount of water a container can store.

const solution = (height) => {
  let maxArea = 0
  let left = 0
  let right = height.length - 1

  while (left < right) {
    maxArea = Math.max(maxArea, Math.min(height[left], height[right]) * (right - left))

    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }

  return maxArea
}
