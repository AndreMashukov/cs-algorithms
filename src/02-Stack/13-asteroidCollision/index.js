// 735. Asteroid Collision
// https://leetcode.com/problems/asteroid-collision/description/
// https://www.youtube.com/watch?v=LN7KjRszjk4
// We are given an array asteroids of integers representing asteroids in a row.
// For each asteroid, the absolute value represents its size,
// and the sign represents its direction (positive meaning right,
// negative meaning left). Each asteroid moves at the same speed.

// Find out the state of the asteroids after all collisions.
// If two asteroids meet, the smaller one will explode.
// If both are the same size, both will explode.
// Two asteroids moving in the same direction will never meet.

// Example 1:

// Input: asteroids = [5,10,-5]
// Output: [5,10]
// Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
// Example 2:

// Input: asteroids = [8,-8]
// Output: []
// Explanation: The 8 and -8 collide exploding each other.

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = function (asteroids) {
  const stack = [] // Initialize a stack to store the asteroids

  for (const a of asteroids) {
    let destroyed = false // Flag to check if the current asteroid is destroyed

    // Process collisions
    while (stack.length && a < 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1]
      const diff = top + a

      if (diff < 0) {
        // The current asteroid destroys the top of the stack
        stack.pop()
      } else if (diff > 0) {
        // The top of the stack destroys the current asteroid
        destroyed = true
        break
      } else {
        // Both asteroids destroy each other
        stack.pop()
        destroyed = true
        break
      }
    }

    // If the current asteroid is not destroyed, push it onto the stack
    if (!destroyed) {
      stack.push(a)
    }
  }

  return stack // Return the state of the asteroids after all collisions
}

// Example usage:
console.log(asteroidCollision([5, 10, -5])) // Expected output: [5, 10]
console.log(asteroidCollision([8, -8])) // Expected output: []
console.log(asteroidCollision([10, 2, -5])) // Expected output: [10]
console.log(asteroidCollision([-2, -1, 1, 2])) // Expected output: [-2, -1, 1, 2]
