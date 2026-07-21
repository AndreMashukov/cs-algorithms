# 215. Kth Largest Element in an Array
# https://leetcode.com/problems/kth-largest-element-in-an-array/
# Medium
#
# Given an integer array nums and an integer k, return the kth largest
# element in the array.
#
# Note that it is the kth largest element in the sorted order,
# not the kth distinct element.
#
# Can you solve it without sorting?

from heapq import heappush, heappop
from typing import List


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # Min-heap of size k: root is the kth largest seen so far
        heap: List[int] = []

        for num in nums:
            heappush(heap, num)
            if len(heap) > k:
                heappop(heap)

        return heap[0]


if __name__ == "__main__":
    print(Solution().findKthLargest([3, 2, 1, 5, 6, 4], 2))  # 5
    print(Solution().findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))  # 4
