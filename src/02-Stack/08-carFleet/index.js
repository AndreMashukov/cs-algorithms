// 853. Car Fleet
// https://leetcode.com/problems/car-fleet/
// https://www.youtube.com/watch?v=Pr6T-3yB9RM
// There are n cars going to the same destination along a one-lane road.
// The destination is target miles away.
// You are given two integer array position and speed,
// where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).
// A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed.
// The distance between these two cars is ignored (i.e., they are assumed to have the same position).
// A car fleet is some non-empty set of cars driving at the same position and same speed.
// Note that a single car is also a car fleet.

class Solution {
  /**
   * @param {number} target
   * @param {number[]} position
   * @param {number[]} speed
   * @return {number}
   */
  carFleet (target, position, speed) {
    // Create pairs of position and speed
    const pair = position.map((p, i) => [p, speed[i]])
    // Sort pairs by position in descending order
    pair.sort((a, b) => b[0] - a[0])
    const stack = []
    for (const [p, s] of pair) {
      // Calculate time to reach the target and push to stack
      stack.push((target - p) / s) // [4, 1.8]
      // If the current car fleet time is less than or equal to the previous one, merge them
      if (
        stack.length >= 2 &&
        stack[stack.length - 1] <= stack[stack.length - 2] // 1.8 <= 4
      ) {
        stack.pop() // remove 1.8
      }
    }
    // The length of the stack represents the number of car fleets
    return stack.length
  }
}

// Target distance: 12 (finish line)
// Positions: [0, 3, 8] (starting positions of 3 cars)
// Speeds: [2, 5, 1] (units per time)
// [[8, 1], [3, 5], [0, 2]]

// Car at position 8: time = (12 - 8) / 1 = 4 units
// Car at position 3: time = (12 - 3) / 5 = 1.8 units
// Car at position 0: time = (12 - 0) / 2 = 6 units

// Start with car at position 8: stack = [4]
// Process car at position 3:
// This car takes 1.8 units (faster than the car ahead at 4 units)
// But it can't overtake, so it must slow down to match
// Since 1.8 < 4, we remove 1.8 from stack: stack = [4]
// Process car at position 0:
// This car takes 6 units (slower than the fleet ahead)
// It won't catch up, so it forms its own fleet
// stack = [4, 6]