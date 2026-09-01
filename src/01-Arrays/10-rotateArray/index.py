# https://leetcode.com/problems/rotate-array/description/
# http://youtube.com/watch?v=utE_1ppU5DY
# Given an integer array nums, rotate the array to the right by k steps,
# where k is non-negative.

from typing import List


class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        # If k is greater than nums length, take the remainder
        k = k % len(nums)
        # Reverse the whole array
        self._reverse(nums, 0, len(nums) - 1)
        # Reverse the first k elements
        self._reverse(nums, 0, k - 1)
        # Reverse the rest of the elements
        self._reverse(nums, k, len(nums) - 1)

    def _reverse(self, nums: List[int], start: int, end: int) -> None:
        """Reverses elements in the array from start to end indices."""
        while start < end:
            # Swap the elements at start and end
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1


if __name__ == "__main__":
    nums = [1, 2, 3, 4, 5, 6, 7]
    Solution().rotate(nums, 3)
    print(nums)  # [5, 6, 7, 1, 2, 3, 4]
