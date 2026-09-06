# https://leetcode.com/problems/contiguous-array/description/
# https://www.youtube.com/watch?v=nSEO5zOwP7g&t=62s
# Given a binary array nums, return the maximum length of a contiguous subarray
# with an equal number of 0 and 1.

# Example 1:

# Input: nums = [0,1]
# Output: 2
# Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.

from typing import Dict, List


class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        # Initialize a map to store the count and its corresponding index
        count_map: Dict[int, int] = {}
        # Add a base case to handle the situation when the subarray starts from index 0
        count_map[0] = -1
        max_length = 0  # Variable to store the maximum length of the subarray
        count = 0  # Variable to store the count of 1s and 0s

        for i, num in enumerate(nums):
            # Increment count by 1 if num is 1, otherwise decrement by 1
            count += -1 if num == 0 else 1

            # If the count has been seen before,
            # it means there is a subarray with equal number of 0s and 1s
            if count in count_map:
                # Update the maximum length of the subarray
                # i - count_map[count] - current index - index where the same count was first encountered
                max_length = max(max_length, i - count_map[count])
            else:
                # Otherwise, store the count with its corresponding index
                count_map[count] = i

        return max_length  # Return the maximum length of the subarray


# We start traversing the array from left to right.
# If at any moment, the count becomes zero,
# it implies that we've encountered equal number of zeros and ones
# from the beginning till the current index of the array.
# Not only this, another point to be noted is that
# if we find the same count twice,
# it means that the number of zeros and ones are equal
# between the indices corresponding to the equal count values.

# It uses a map to track the count of 1s and 0s and their
# corresponding indices to identify subarrays
# with equal numbers of 0s and 1s.

# The expression i - count_map[count] calculates the length of the subarray
# with an equal number of 0s and 1s.
# Here, i is the current index in the array,
# and count_map[count] retrieves the index
# where the same cumulative count was first encountered.
# The difference between these two indices gives the length
# of the subarray that has an equal number of 0s and 1s.

if __name__ == "__main__":
    solution = Solution()
    print(solution.findMaxLength([0, 1]))  # 2
    print(solution.findMaxLength([0, 1, 0]))  # 2
    print(solution.findMaxLength([0, 1, 0, 1, 0, 1]))  # 6
    print(solution.findMaxLength([0, 1, 0, 1, 0, 1, 0, 1]))  # 8
    print(solution.findMaxLength([0, 1, 0, 1, 0, 1, 0, 1, 0, 1]))  # 10
    print(solution.findMaxLength([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]))  # 12
