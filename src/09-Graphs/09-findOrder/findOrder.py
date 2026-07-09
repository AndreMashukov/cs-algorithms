# LeetCode 210 - Course Schedule II
# https://leetcode.com/problems/course-schedule-ii/description/
# You are given an array prerequisites where prerequisites[i] = [a, b]
# indicates that you must take course b first
# if you want to take course a.
#
# For example, the pair [0, 1], indicates that to take course 0
# you have to first take course 1.
# There are a total of numCourses courses you are required to take,
# labeled from 0 to numCourses - 1.
#
# Return a valid ordering of courses you can take to finish all courses.
# If there are many valid answers, return any of them.
# If it's not possible to finish all courses, return an empty array.

from typing import Dict, List, Set


class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        prereq: Dict[int, List[int]] = {}
        for course, pre in prerequisites:
            if course not in prereq:
                prereq[course] = []
            prereq[course].append(pre)

        output: List[int] = []
        visit: Set[int] = set()
        cycle: Set[int] = set()

        def dfs(crs: int) -> bool:
            if crs in cycle:
                return False
            if crs in visit:
                return True

            cycle.add(crs)
            for pre in prereq.get(crs, []):
                if not dfs(pre):
                    return False
            cycle.remove(crs)
            visit.add(crs)
            output.append(crs)
            return True

        for c in range(numCourses):
            if not dfs(c):
                return []

        return output


if __name__ == "__main__":
    print(Solution().findOrder(2, [[1, 0]]))  # [0, 1]

# cycle Set:
# Purpose: Detect cycles during the DFS traversal.
# Usage: This set keeps track of the courses
# that are currently being visited in the current DFS path.
# If a course is encountered that is already in the cycle set,
# it indicates a cycle, meaning that the course depends on itself
# either directly or indirectly.
# Behavior: Courses are added to the cycle set when they are first visited and removed once all their prerequisites have been processed.
#
# visit Set:
# Purpose: Track courses that have been fully processed.
# Usage: This set keeps track of the courses
# that have been completely visited,
# meaning all their prerequisites have been checked
# and no cycles were found. Once a course is added to the visit set,
# it will not be revisited in future DFS calls.
# Behavior: Courses are added to the visit set after
# they have been fully processed and removed from the cycle set.
