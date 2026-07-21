# 973. K Closest Points to Origin
# https://leetcode.com/problems/k-closest-points-to-origin/
# Medium
#
# Given an array of points where points[i] = [xi, yi] represents a point
# on the X-Y plane and an integer k, return the k closest points to the
# origin (0, 0).
#
# The distance between two points on the X-Y plane is the Euclidean
# distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
#
# You may return the answer in any order. The answer is guaranteed
# to be unique (except for the order that it is in).

from heapq import heappush, heappop
from typing import List, Tuple


class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        # Max-heap of size k (store negative distance so largest is on top)
        heap: List[Tuple[int, int, int]] = []

        for x, y in points:
            dist = -(x * x + y * y)
            heappush(heap, (dist, x, y))
            if len(heap) > k:
                heappop(heap)

        return [[x, y] for _, x, y in heap]


if __name__ == "__main__":
    print(Solution().kClosest([[1, 3], [-2, 2]], 1))  # [[-2, 2]]
    print(Solution().kClosest([[3, 3], [5, -1], [-2, 4]], 2))  # [[3, 3], [-2, 4]]
