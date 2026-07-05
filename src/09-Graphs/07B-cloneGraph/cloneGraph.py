# LeetCode 133 - Clone Graph
# https://leetcode.com/problems/clone-graph/description/
# https://www.youtube.com/watch?v=mQeF6bN8hMk
# Given a node in a connected undirected graph, return a deep copy of the graph.

from typing import Dict, Optional


# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, neighbors: Optional[list["Node"]] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class Solution:
    def cloneGraph(self, node: Optional[Node]) -> Optional[Node]:
        # Map to store the mapping from original nodes to their copies
        old_to_new: Dict[Node, Node] = {}
        # Start the DFS traversal to clone the graph
        return self._dfs(node, old_to_new)

    def _dfs(self, node: Optional[Node], old_to_new: Dict[Node, Node]) -> Optional[Node]:
        # Base case: if the node is null, return null
        if node is None:
            return None

        # If the node has already been copied, return the copy
        if node in old_to_new:
            return old_to_new[node]

        # Create a copy of the current node
        copy = Node(node.val)
        # Store the copy in the map
        old_to_new[node] = copy

        # Recursively clone all the neighbors
        for nei in node.neighbors:
            copy.neighbors.append(self._dfs(nei, old_to_new))

        # Return the copy of the current node
        return copy


if __name__ == "__main__":
    # 1: [2, 3]
    # 2: [1, 4]
    # 3: [1, 4]
    # 4: [2, 3]
    node1 = Node(1)
    node2 = Node(2)
    node3 = Node(3)
    node4 = Node(4)
    node1.neighbors = [node2, node3]
    node2.neighbors = [node1, node4]
    node3.neighbors = [node1, node4]
    node4.neighbors = [node2, node3]

    cloned = Solution().cloneGraph(node1)
    print(cloned.val, [n.val for n in cloned.neighbors])
    # Expected: 1 [2, 3]

# recursive dfs, hashmap for visited nodes
# If a node is null, return null.
# If a node has already been copied, return the copy from the map.
# Create a copy of the current node and store it in the map.
# Recursively clone all neighbors and add them to the neighbors list of the copy.
