// 48. Rotate Image
// https://leetcode.com/problems/rotate-image/
// https://www.youtube.com/watch?v=fMSJSS7eO1w
// You are given an n x n 2D matrix representing an image,
// rotate the image by 90 degrees (clockwise).
// You have to rotate the image in-place, which means
// you have to modify the input 2D matrix directly.
// DO NOT allocate another 2D matrix and do the rotation.

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  let l = 0 // Left pointer
  let r = matrix.length - 1 // Right pointer

  // Iterate through the layers of the matrix
  while (l < r) {
    for (let i = 0; i < r - l; i++) { // r - l represents the current layer's width
      // Save the top-left value in a temporary variable
      const temp = matrix[l][l + i]
      // Move the bottom-left value to the top-left
      matrix[l][l + i] = matrix[r - i][l]
      // Move the bottom-right value to the bottom-left
      matrix[r - i][l] = matrix[r][r - i]
      // Move the top-right value to the bottom-right
      matrix[r][r - i] = matrix[l + i][r]
      // Move the top-left value (saved in temp) to the top-right
      matrix[l + i][r] = temp
    }
    l++ // Move the left pointer inward
    r-- // Move the right pointer inward
  }
}
