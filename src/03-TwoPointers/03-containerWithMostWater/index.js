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
    maxArea = Math.max(
      maxArea,
      Math.min(height[left], height[right]) * (right - left)
    )

    if (height[left] < height[right]) {
      // Increments the left pointer
      // in the hope of finding a taller line on the left side
      left++
    } else {
      // Decrements the right pointer to find a taller line on the right side.
      right--
    }
  }

  return maxArea
}

// In each iteration of the loop,
//  it calculates the area between the left and right lines.
// The area is calculated as the distance between the lines
//  (i.e., right - left) multiplied by the height of the shorter line
//  (i.e., Math.min(height[left], height[right])).
//  If this area is greater than maxArea,
// it updates maxArea.
