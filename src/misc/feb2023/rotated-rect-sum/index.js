/* eslint-disable require-jsdoc */

const getLength = (matrix) => {
  // rows, cols = len(matrix), len(matrix[0])
  return { rowLength: matrix.length, colLength: matrix[0].length }
}

const getPrimaryDiagonal = (matrix, anchor) => {
  const { rowLength, colLength } = getLength(matrix)
  const diag = []
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (i === j) {
        if (matrix[i + anchor]) {
          diag.push(matrix[i + anchor][j])
        }
      }
    }
  }
  // console.log({ rowLength, colLength })
  return diag
}

const getSecondaryDiagonal = (matrix) => {
  const { rowLength, colLength } = getLength(matrix)
  const diag = []
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (i === rowLength - j) {
        diag.push(matrix[i][j])
      }
    }
  }
  // console.log({ rowLength, colLength })
  return diag
}

const solution = (matrix, a, b) => {
  const { rowLength, colLength } = getLength(matrix)
  const primeDiagList = []
  for (let i = 0; i < rowLength; i++) {
    primeDiagList.push(getPrimaryDiagonal(matrix, i))
  }
  console.log({ sec: getSecondaryDiagonal(matrix) })
  return 1
}

module.exports.rotatedRectSum = { solution }
