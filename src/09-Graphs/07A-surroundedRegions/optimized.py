# LeetCode 130 - Surrounded Regions
# https://leetcode.com/problems/surrounded-regions/description/
# Mark border-connected 'O' cells with DFS, flip remaining 'O' to 'X',
# then restore marked cells back to 'O'.

from typing import List


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        rows = len(board)
        if rows == 0:
            return
        cols = len(board[0])

        def dfs(r: int, c: int) -> None:
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != "O":
                return
            board[r][c] = "S"
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            if board[r][0] == "O":
                dfs(r, 0)
            if board[r][cols - 1] == "O":
                dfs(r, cols - 1)

        for c in range(cols):
            if board[0][c] == "O":
                dfs(0, c)
            if board[rows - 1][c] == "O":
                dfs(rows - 1, c)

        for r in range(rows):
            for c in range(cols):
                if board[r][c] == "O":
                    board[r][c] = "X"
                elif board[r][c] == "S":
                    board[r][c] = "O"


if __name__ == "__main__":
    board = [
        ["X", "X", "X", "X"],
        ["X", "O", "O", "X"],
        ["X", "X", "O", "X"],
        ["X", "O", "X", "X"],
    ]
    Solution().solve(board)
    print(board)
    # Expected:
    # ['X', 'X', 'X', 'X']
    # ['X', 'X', 'X', 'X']
    # ['X', 'X', 'X', 'X']
    # ['X', 'O', 'X', 'X']
