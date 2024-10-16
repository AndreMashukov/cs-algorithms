// You are given an array prerequisites where prerequisites[i] = [a, b]
// indicates that you must take course b first
// if you want to take course a.

// For example, the pair [0, 1], indicates that to take course 0
// you have to first take course 1.
// There are a total of numCourses courses you are required to take,
// labeled from 0 to numCourses - 1.

// Return a valid ordering of courses you can take to finish all courses.
// If there are many valid answers, return any of them.
// If it's not possible to finish all courses, return an empty array.

class Solution {
  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {number[]}
   */
  findOrder (numCourses, prerequisites) {
    const prereq = new Map() // Map to store prerequisites for each course
    for (const [course, pre] of prerequisites) {
      if (!prereq.has(course)) {
        prereq.set(course, []) // Initialize with an empty array if not already present
      }
      prereq.get(course).push(pre) // Add the prerequisite to the course
    }

    const output = [] // Array to store the course order
    const visit = new Set() // Set to track visited courses
    const cycle = new Set() // Set to detect cycles

    // Closure function for DFS
    const dfs = (course) => {
      if (cycle.has(course)) {
        return false // Cycle detected
      }
      if (visit.has(course)) {
        return true // Course already visited
      }

      cycle.add(course) // Mark the course as being visited
      for (const pre of prereq.get(course) || []) {
        if (!dfs(pre)) {
          return false // Cycle detected in prerequisites
        }
      }
      cycle.delete(course) // Unmark the course as being visited
      visit.add(course) // Mark the course as visited
      output.push(course) // Add the course to the output array
      return true
    };

    // Check all courses
    for (let c = 0; c < numCourses; c++) {
      if (!dfs(c)) {
        return [] // Return empty array if a cycle is detected
      }
    }

    return output // Return the valid course order
  }
}
