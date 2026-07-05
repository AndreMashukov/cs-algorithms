/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0)
  const adj = Array.from({ length: numCourses }, () => [])
  // console.log(inDegree, adj)
  for (let [course, prereq] of prerequisites) {
    inDegree[course]++
    adj[prereq].push(course)
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }
  }
  let completedCourses = 0
  let head = 0;

  while (head < queue.length) {
    const current = queue[head++]
    completedCourses++

    for (let nextCourse of adj[current]) {
      if (--inDegree[nextCourse] === 0) {
        queue.push(nextCourse)
      }
    }
  }

  return completedCourses === numCourses
};