# LintCode Graph Valid Tree
# https://www.lintcode.com/problem/178/description
# https://www.youtube.com/watch?v=bXsUuownnoQ
# Given n nodes labeled from 0 to n - 1 and a list of undirected edges
# (each edge is a pair of nodes), write a function
# to check whether these edges make up a valid tree.

from typing import Dict, List, Set


class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        adjacency_list: Dict[int, List[int]] = {}

        # A single node with no edges is considered a valid tree.
        # If there's exactly one node, it must have zero edges.
        if n == 1:
            return len(edges) == 0

        # If there are multiple nodes and no edges,
        # the graph is disconnected
        if len(edges) == 0:
            return False

        for n1, n2 in edges:
            if n1 not in adjacency_list:
                adjacency_list[n1] = []
            if n2 not in adjacency_list:
                adjacency_list[n2] = []
            adjacency_list[n1].append(n2)
            adjacency_list[n2].append(n1)

        visited: Set[int] = set()

        def dfs(node: int, prev: int) -> bool:
            if node in visited:
                return False

            visited.add(node)

            for nei in adjacency_list[node]:
                if nei == prev:
                    continue

                if not dfs(nei, node):
                    return False

            return True

        if not dfs(0, -1):
            return False

        return len(visited) == n


if __name__ == "__main__":
    print(Solution().validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]))  # True

# union find, if union return false, loop exists,
# at end size must equal n, or its not connected;
# dfs to get size and check for loop, since each edge is double,
# before dfs on neighbor of N, remove N from neighbor list of neighbor;
#
# Cycle Detection with DFS:
# The algorithm uses Depth-First Search (DFS) to detect cycles in the graph.
# If a node is revisited during the DFS traversal,
# a cycle is detected, and the graph cannot be a valid tree.
#
# Connectivity Check:
# After the DFS traversal, the algorithm checks if all nodes have been visited.
# This ensures that the graph is fully connected.
# If the number of visited nodes is equal to n,
# the graph is connected; otherwise, it is not a valid tree.
