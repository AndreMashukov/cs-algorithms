class Solution {
  /**
   * @param {number} n
   * @return {string[][]}
   */
  solveNQueens(n) {
      let res = [];
      let col = new Set()
      let posDiag = new Set()
      let negDiag = new Set()

      const board = Array.from({length: n}, () => Array(n).fill("."));
      // console.log(board)
      const dfs = (r) => {
          if (r === n) {
              // console.log(board)
              res.push(board.map(row => row.join("")))
              return
          }

          for (let c = 0; c < n; c++) {
              if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
                  continue
              }

              col.add(r)
              posDiag.add(r + c)
              negDiag.add(r - c)
              board[r][c] = "Q"
              dfs(r + 1)
              col.delete(r)
              posDiag.delete(r + c)
              negDiag.delete(r - c)
              board[r][c] = "."
          }
      }

      dfs(0)
      return res
  }
}
