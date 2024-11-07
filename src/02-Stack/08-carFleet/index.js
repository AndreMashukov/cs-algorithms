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
      stack.push((target - p) / s)
      // If the current car fleet time is less than or equal to the previous one, merge them
      if (
        stack.length >= 2 &&
        stack[stack.length - 1] <= stack[stack.length - 2]
      ) {
        stack.pop()
      }
    }
    // The length of the stack represents the number of car fleets
    return stack.length
  }
}
