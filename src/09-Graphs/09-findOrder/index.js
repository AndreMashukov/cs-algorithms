// LeetCode 210 - Course Schedule II
// https://leetcode.com/problems/course-schedule-ii/description/
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
    const dfs = (crs) => {
      if (cycle.has(crs)) {
        return false // Cycle detected
      }
      if (visit.has(crs)) {
        return true // Course already visited
      }

      cycle.add(crs) // Mark the course as being visited
      for (const pre of prereq.get(crs) || []) {
        if (!dfs(pre)) {
          return false // Cycle detected in prerequisites
        }
      }
      cycle.delete(crs) // Unmark the course as being visited
      visit.add(crs) // Mark the course as visited
      output.push(crs) // Add the course to the output array
      return true
    }

    // Check all courses
    for (let c = 0; c < numCourses; c++) {
      if (!dfs(c)) {
        return [] // Return empty array if a cycle is detected
      }
    }

    return output // Return the valid course order
  }
}

console.log(new Solution().findOrder(2, [[1, 0]])) // [0, 1]

// cycle Set:
// Purpose: Detect cycles during the DFS traversal.
// Usage: This set keeps track of the courses
// that are currently being visited in the current DFS path.
// If a course is encountered that is already in the cycle set,
// it indicates a cycle, meaning that the course depends on itself
// either directly or indirectly.
// Behavior: Courses are added to the cycle set when they are first visited and removed once all their prerequisites have been processed.

// visit Set:
// Purpose: Track courses that have been fully processed.
// Usage: This set keeps track of the courses
// that have been completely visited,
// meaning all their prerequisites have been checked
// and no cycles were found. Once a course is added to the visit set,
// it will not be revisited in future DFS calls.
// Behavior: Courses are added to the visit set after
// they have been fully processed and removed from the cycle set.
