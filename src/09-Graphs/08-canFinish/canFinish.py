# LeetCode 207 - Course Schedule
# https://leetcode.com/problems/course-schedule/description/
# You are given an array prerequisites where prerequisites[i] = [a, b] indicates
# that you must take course b first if you want to take course a.
#
# The pair [0, 1], indicates that must take course 1 before taking course 0.
#
# There are a total of numCourses courses you are required to take,
# labeled from 0 to numCourses - 1.
#
# Return true if it is possible to finish all courses,
# otherwise return false.
#
# Visual explanation moved to `course-schedule-diagram.md` in this directory.

from typing import Dict, List, Set


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        pre_map: Dict[int, List[int]] = {i: [] for i in range(numCourses)}
        visiting: Set[int] = set()

        for pair in prerequisites:
            pre_map[pair[0]].append(pair[1])

        def dfs(crs: int) -> bool:
            if crs in visiting:
                return False
            if len(pre_map[crs]) == 0:
                return True

            visiting.add(crs)
            for pre in pre_map[crs]:
                if not dfs(pre):
                    return False
            # Unmark the course as being visited (backtracking)
            # Diagram (state change in `visiting`):
            #   Before leaving `crs`: { ..., crs }
            #   After  leaving `crs`: { ... }
            #
            # Recursion stack view:
            #   dfs(parent)
            #     -> dfs(crs)   add `crs` to visiting
            #         -> dfs(pre1) ... done
            #         -> dfs(pre2) ... done
            #     backtrack from `crs`: remove from visiting so upper frames
            #     won't report a false cycle when they see `crs` again later
            visiting.remove(crs)
            pre_map[crs] = []
            return True

        for c in range(numCourses):
            if not dfs(c):
                return False
        return True


if __name__ == "__main__":
    print(Solution().canFinish(2, [[1, 0]]))  # True

# build adjacentcy_list with edges,
# run dfs on each V, if while dfs on V we see V again,
# then loop exists, otherwise V isnt in a loop,
# 3 states= not visited, visited, still visiting
#
# Populate preMap:
#
# Initialize preMap with an empty array for each course.
# Populate preMap with the given prerequisites.
# DFS Closure Function:
#
# Check for cycles by marking courses as visiting.
# If a cycle is detected (course revisited), return false.
# If a course has no prerequisites, return true.
# Recursively visit all prerequisites of the course.
# Mark the course's prerequisites as processed.
# Check All Courses:
#
# Perform DFS for each course.
# If any course cannot be completed due to a cycle, return false.
