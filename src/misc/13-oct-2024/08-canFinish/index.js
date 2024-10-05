// You are given an array prerequisites where prerequisites[i] = [a, b] indicates
// that you must take course b first if you want to take course a.

// The pair [0, 1], indicates that must take course 1 before taking course 0.

// There are a total of numCourses courses you are required to take,
// labeled from 0 to numCourses - 1.

// Return true if it is possible to finish all courses,
// otherwise return false.

class Solution {
  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {boolean}
   */
  canFinish (numCourses, prerequisites) {
    const preMap = new Map() // Map to store prerequisites for each course
    const visiting = new Set() // Set to track courses currently being visited in DFS

    // Initialize preMap with an empty array for each course
    for (let i = 0; i < numCourses; i++) {
      preMap.set(i, [])
    }

    // Populate preMap with the given prerequisites
    for (const pair of prerequisites) {
      preMap.get(pair[0]).push(pair[1])
    }

    // Closure function for DFS
    const dfs = (crs) => {
      // If the course is already in the visiting set, a cycle is detected
      if (visiting.has(crs)) {
        return false
      }
      // If the course has no prerequisites, it can be completed
      if (preMap.get(crs).length === 0) {
        return true
      }

      // Mark the course as being visited
      visiting.add(crs)
      // Recursively visit all prerequisites of the course
      for (const pre of preMap.get(crs)) {
        if (!dfs(pre)) {
          return false
        }
      }
      // Unmark the course as being visited
      visiting.delete(crs)
      // Mark the course's prerequisites as processed
      preMap.set(crs, [])
      return true
    }

    // Check all courses
    for (let c = 0; c < numCourses; c++) {
      // If any course cannot be completed due to a cycle, return false
      if (!dfs(c)) {
        return false
      }
    }
    // If all courses can be completed, return true
    return true
  }
}

// Populate preMap:

// Initialize preMap with an empty array for each course.
// Populate preMap with the given prerequisites.
// DFS Closure Function:

// Check for cycles by marking courses as visiting.
// If a cycle is detected (course revisited), return false.
// If a course has no prerequisites, return true.
// Recursively visit all prerequisites of the course.
// Mark the course's prerequisites as processed.
// Check All Courses:

// Perform DFS for each course.
// If any course cannot be completed due to a cycle, return false.
