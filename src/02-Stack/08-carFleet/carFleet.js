// Return the number of different car fleets
// that will arrive at the destination.

// Example 1:
// Input: target = 10, position = [1,4], speed = [3,2]
// Output: 1

class Solution {
  /**
   * @param {number} target
   * @param {number[]} position
   * @param {number[]} speed
   * @return {number}
   */
  carFleet (target, position, speed) {
    const n = position.length
    const pairs = position.map((p, i) => [p, speed[i]])
    pairs.sort((a, b) => b[0] - a[0])

    let fleetCount = 0
    // The time it takes to reach the target
    const timeToReach = new Array(n)
    for (let i = 0; i < n; i++) {
      timeToReach[i] = (target - pairs[i][0]) / pairs[i][1]
      // If the time to reach the destination is less than the time
      // to reach the previous car
      if (i >= 1 && timeToReach[i] <= timeToReach[i - 1]) {
        // The time to reach the destination is the same as the previous car
        timeToReach[i] = timeToReach[i - 1]
      } else {
        // It starts a new fleet
        fleetCount++
      }
    }
    return fleetCount
  }
}
