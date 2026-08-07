# https://leetcode.com/problems/sort-colors/
# http://youtube.com/watch?v=BOt1DAvR0zI
# Given an array nums with n objects colored red, white, or blue,
# sort them in-place so that objects of the same color are adjacent,
# with the colors in the order red, white, and blue.

# We will use the integers 0, 1, and 2 to represent the color
# red, white, and blue, respectively.

# You must solve this problem without using the library's sort function.

# Example 1:

# Input: nums = [2,0,2,1,1,0]
# Output: [0,0,1,1,2,2]

from typing import List


class Solution:
    def sortColors(self, nums: List[int]) -> None:
        counts = [0] * 3

        # Count how many times each color appears
        for num in nums:
            counts[num] += 1

        # Overwrite nums based on the count of each color
        i = 0  # tracks the index in the original array
        for n in range(len(counts)):
            # For each value (0, 1, 2), place it in the array counts[n] times
            for _ in range(counts[n]):
                nums[i] = n
                i += 1


if __name__ == "__main__":
    nums = [2, 0, 2, 1, 1, 0]
    Solution().sortColors(nums)
    print(nums)  # [0, 0, 1, 1, 2, 2]
