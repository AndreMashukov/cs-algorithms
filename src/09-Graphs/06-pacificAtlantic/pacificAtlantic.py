# LeetCode 417 - Pacific Atlantic Water Flow
# https://leetcode.com/problems/pacific-atlantic-water-flow/description/
# You are given a rectangular island heights where heights[r][c] represents the height
# above sea level of the cell at coordinate (r, c).
#
# The islands borders the Pacific Ocean from the top and left sides,
# and borders the Atlantic Ocean from the bottom and right sides.
#
# Water can flow in four directions (up, down, left, or right)
# from a cell to a neighboring cell with height equal or lower.
# Water can also flow into the ocean from cells adjacent to the ocean.
#
# Find all cells where water can flow from that cell
# to both the Pacific and Atlantic oceans. Return it as a 2D list
# where each element is a list [r, c] representing the row and column of the cell.
# You may return the answer in any order.

from typing import List


class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        rows = len(heights)
        cols = len(heights[0])
        pac: set[tuple[int, int]] = set()
        atl: set[tuple[int, int]] = set()

        def dfs(r: int, c: int, prev_height: int, visited: set[tuple[int, int]]) -> None:
            if (
                r < 0
                or r >= rows
                or c < 0
                or c >= cols
                or (r, c) in visited
                or heights[r][c] < prev_height
            ):
                return

            visited.add((r, c))

            dfs(r + 1, c, heights[r][c], visited)
            dfs(r - 1, c, heights[r][c], visited)
            dfs(r, c + 1, heights[r][c], visited)
            dfs(r, c - 1, heights[r][c], visited)

        for i in range(rows):
            dfs(i, 0, heights[i][0], pac)
            dfs(i, cols - 1, heights[i][cols - 1], atl)

        for j in range(cols):
            dfs(0, j, heights[0][j], pac)
            dfs(rows - 1, j, heights[rows - 1][j], atl)

        res: List[List[int]] = []
        for r in range(rows):
            for c in range(cols):
                if (r, c) in pac and (r, c) in atl:
                    res.append([r, c])

        return res


if __name__ == "__main__":
    heights = [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
    ]
    print(Solution().pacificAtlantic(heights))
    # Expected: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
