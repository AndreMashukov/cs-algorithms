// Given an m x n grid of characters board and a string word,
// return true if word exists in the grid.

const wordSearch = (board, word) => {
  const dfs = (i, j, index) => {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
      return false
    }

    if (board[i][j] !== word[index]) {
      return false
    }

    if (index === word.length - 1) {
      return true
    }

    const temp = board[i][j]
    board[i][j] = ' '

    const found =
      dfs(i + 1, j, index + 1) ||
      dfs(i - 1, j, index + 1) ||
      dfs(i, j + 1, index + 1) ||
      dfs(i, j - 1, index + 1)

    board[i][j] = temp

    return found
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (dfs(i, j, 0)) {
        return true
      }
    }
  }

  return false
};

console.log(
  wordSearch(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    'ABCCED'
  )
)

// Output: true
