# 547. Number of Provinces
# https://leetcode.com/problems/number-of-provinces/
# Medium
# Topics
# premium lock icon
# Companies
# There are n cities. Some of them are connected, while some are not.
# If city a is connected directly with city b, and city b is connected
# directly with city c, then city a is connected indirectly with city c.
#
# A province is a group of directly or indirectly connected cities
# and no other cities outside of the group.
#
# You are given an n x n matrix isConnected where isConnected[i][j] = 1
# if the ith city and the jth city are directly connected,
# and isConnected[i][j] = 0 otherwise.
#
# Return the total number of provinces.

from typing import List


class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        parent = list(range(n))
        rank = [1] * n

        def find(node: int) -> int:
            while parent[node] != node:
                parent[node] = parent[parent[node]]  # path compression
                node = parent[node]
            return node

        def union(a: int, b: int) -> int:
            pa = find(a)
            pb = find(b)
            if pa == pb:
                return 0
            if rank[pb] > rank[pa]:
                parent[pa] = pb
                rank[pb] += rank[pa]
            else:
                parent[pb] = pa
                rank[pa] += rank[pb]
            return 1

        provinces = n
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    provinces -= union(i, j)

        return provinces


if __name__ == "__main__":
    print(Solution().findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]))  # 2
    print(Solution().findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]]))  # 3
    print(Solution().findCircleNum([[1, 1, 0], [1, 1, 1], [0, 1, 1]]))  # 1
