# https://leetcode.com/problems/gas-station/
# http://youtube.com/watch?v=wDgKaNrSOEI
# There are n gas stations along a circular route,
# where the amount of gas at the ith station is gas[i].

# You have a car with an unlimited gas tank and it costs cost[i] of gas to travel
#  from the ith station to its next (i + 1)th station.
# You begin the journey with an empty tank at one of the gas stations.

# Given two integer arrays gas and cost,
# return the starting gas station's index
# if you can travel around the circuit once in the clockwise direction,
# otherwise return -1. If there exists a solution, it is guaranteed to be unique.

from typing import List


class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        total_gas = 0  # Total gas available
        total_cost = 0  # Total cost required
        tank = 0  # Current gas in tank
        start = 0  # Starting gas station index

        for i in range(len(gas)):
            total_gas += gas[i]  # Accumulate total gas
            total_cost += cost[i]  # Accumulate total cost
            tank += gas[i] - cost[i]  # Update tank balance

            # If tank balance is negative, reset start position
            if tank < 0:
                start = i + 1  # Set next station as starting point
                tank = 0  # Reset tank balance

        # If total gas is less than total cost, return -1, otherwise return start index
        return -1 if total_gas < total_cost else start


# It iterates through each station,
# keeping track of the total gas and total cost.
# If at any point the gas in the tank becomes negative,
# it resets the starting position to the next station.
# Finally, it checks if the total gas is less than the total cost;
# if so, it returns -1, indicating the journey is not possible.
# Otherwise, it returns the starting station index.

if __name__ == "__main__":
    print(Solution().canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))  # 3
    print(Solution().canCompleteCircuit([2, 3, 4], [3, 4, 3]))  # -1
