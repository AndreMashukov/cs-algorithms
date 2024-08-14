// Given an m x n grid of characters board and a string word,
// return true if word exists in the grid.

const wordSearch = (board, word) => {
  const dfs = (i, j, index) => {
    // if the current index is out of bounds
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
      return false
    }

    // if the current character is not equal to the character in the word
    if (board[i][j] !== word[index]) {
      return false
    }

    // if we have reached the end of the word
    if (index === word.length - 1) {
      return true
    }

    // mark the current character as visited
    const temp = board[i][j]
    // set the current character to a space to mark it as visited
    board[i][j] = ' '

    const found =
      dfs(i + 1, j, index + 1) ||
      dfs(i - 1, j, index + 1) ||
      dfs(i, j + 1, index + 1) ||
      dfs(i, j - 1, index + 1)

    // backtrack, unvisit the current character
    // by setting it back to its original value
    board[i][j] = temp

    return found
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (dfs(i, j, 0)) {
        return true
      }
    }
  }

  return false
}

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

console.log(
  wordSearch(
    [
      ['A', 'B', 'C', 'D'],
      ['S', 'A', 'A', 'T'],
      ['A', 'C', 'A', 'E']
    ],
    'BAT'
  )
)
// Output: false
