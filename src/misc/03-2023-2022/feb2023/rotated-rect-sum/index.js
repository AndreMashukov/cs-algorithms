/* eslint-disable require-jsdoc */

const getLength = (matrix) => {
  // rows, cols = len(matrix), len(matrix[0])
  return {rowLength: matrix.length, colLength: matrix[0].length};
};

const solution = (matrix, a, b) => {
  let maxArea = -Infinity;
  const {rowLength: rows, colLength: cols} = getLength(matrix);
  const ab = [
    [a, b],
    [b, a],
  ];
    // go through possible rectangles along both diagonals
  for (const [w, h] of ab ) {
    // go through possible "anchors", which is the left top coordinate
    // of the rectangle candidate
    // console.log({p1: rows-h+1, p2: cols - (h + w -1) + 1});
    for (let i = w-1; i < rows - h + 1; i++) {
      for (let j = 0; j < cols - (h + w - 1) + 1; j++) {
        let area = 0;
        // console.log({w, h, i, j});

        // sum up the long diagonals
        for (let p = 0; p < w; p++) { // go to next long diagonal
          for (let q = 0; q < h; q++) { // go down current diagonal
            area += matrix[i - p + q][j + p + q];
            // console.log({m: matrix[i - p + q][j + p + q]});
          }
        }

        // sum up the short diagonals
        // note that short diagonals have one less element than long diagonals
        const k = i;
        const l = j + 1;

        for (let p = 0; p < w - 1; p++) { // go to next long diagonal
          for (let q = 0; q < h - 1; q++) { // go down current diagonal
            area += matrix[k - p + q][l + p + q];
            // console.log({m: matrix[i - p + q][j + p + q]});
          }
        }

        if (area > maxArea) {
          maxArea = area;
        }
      }
    }
  }
  return maxArea;
};

module.exports.rotatedRectSum = {solution};

