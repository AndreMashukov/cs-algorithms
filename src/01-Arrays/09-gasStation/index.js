// https://leetcode.com/problems/gas-station/
// http://youtube.com/watch?v=wDgKaNrSOEI
// There are n gas stations along a circular route,
// where the amount of gas at the ith station is gas[i].

// You have a car with an unlimited gas tank and it costs cost[i] of gas to travel
//  from the ith station to its next (i + 1)th station.
// You begin the journey with an empty tank at one of the gas stations.

// Given two integer arrays gas and cost,
// return the starting gas station's index
// if you can travel around the circuit once in the clockwise direction,
// otherwise return -1. If there exists a solution, it is guaranteed to be unique.

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
const canCompleteCircuit = function (gas, cost) {
  let totalGas = 0 // Total gas available
  let totalCost = 0 // Total cost required
  let tank = 0 // Current gas in tank
  let start = 0 // Starting gas station index

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i] // Accumulate total gas
    totalCost += cost[i] // Accumulate total cost
    tank += gas[i] - cost[i] // Update tank balance

    // If tank balance is negative, reset start position
    if (tank < 0) {
      start = i + 1 // Set next station as starting point
      tank = 0 // Reset tank balance
    }
  }

  // If total gas is less than total cost, return -1, otherwise return start index
  return totalGas < totalCost ? -1 : start
}

// It iterates through each station,
// keeping track of the total gas and total cost.
// If at any point the gas in the tank becomes negative,
// it resets the starting position to the next station.
// Finally, it checks if the total gas is less than the total cost;
// if so, it returns -1, indicating the journey is not possible.
// Otherwise, it returns the starting station index.

console.log(
  canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) // Expected output: 3
)
console.log(
  canCompleteCircuit([2, 3, 4], [3, 4, 3]) // Expected output: -1
)
